/**
 * Core Spotify API integration service.
 * @remarks
 * Handles authentication, token refresh, and data retrieval from the Spotify Web API, specifically fetching currently playing tracks and podcasts.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import axios, { type AxiosError } from 'axios';
import { IConfigService } from '../config/types';
import { User } from '../user/types';
import { ISpotifyService, TrackState } from './types';
import {
  SpotifyTokenRefreshError,
  SpotifyCurrentlyPlayingError,
  SpotifyRateLimitError,
} from './errors';

/**
 * Concrete implementation of the Spotify API service.
 *
 * @remarks
 * Handles network requests to the Spotify API via Axios, parsing responses into TrackState DTOs and managing OAuth token refreshes.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SpotifyService([SpotifyService]) -->|Implements| ISpotifyService[ISpotifyService]
 * SpotifyService -->|Uses| IConfigService[IConfigService]
 * Client[App Bootstrap] -.->|Instantiates| SpotifyService
 * ```
 *
 * @example
 * ```typescript
 * const spotifyService = new SpotifyService(configService);
 * ```
 *
 * @public
 */
export class SpotifyService implements ISpotifyService {
  /**
   * In-memory cache of live access tokens, keyed by user ID.
   * Populated on first use and refreshed automatically when nearing expiry.
   */
  private accessTokens: Map<string, string> = new Map();

  /**
   * Expiration timestamps (ms since epoch) for each cached access token, keyed by user ID.
   * A token is considered stale when fewer than 60 seconds remain before this time.
   */
  private tokenExpirations: Map<string, number> = new Map();

  /** Initial retry delay (1 second). */
  private static readonly INITIAL_BACKOFF_MS = 1_000;

  /** Maximum retry delay (5 minutes). */
  private static readonly MAX_BACKOFF_MS = 300_000;

  /**
   * Timestamp (ms since epoch) at which the global backoff window expires.
   * A value of 0 means the service is not currently backed off.
   * Global because all users share the same Spotify API credentials.
   */
  private backoffUntil: number = 0;

  /**
   * Current backoff delay in milliseconds for the next retry.
   * Doubles on each successive 429, capped at {@link MAX_BACKOFF_MS}.
   */
  private backoffDelayMs: number = SpotifyService.INITIAL_BACKOFF_MS;

  /**
   * @param configService - Application configuration provider supplying Spotify API credentials.
   */
  constructor(private configService: IConfigService) {}

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /**
   * Returns the current time as a compact ISO-8601 string for log prefixes.
   */
  private static timestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Returns `true` when the service is still within an active backoff window.
   */
  private isBackedOff(): boolean {
    return Date.now() < this.backoffUntil;
  }

  /**
   * Returns the remaining backoff time in milliseconds.
   */
  private remainingBackoffMs(): number {
    return Math.max(0, this.backoffUntil - Date.now());
  }

  /**
   * Records a 429 event, doubling the backoff delay (with ±10 % jitter)
   * up to {@link MAX_BACKOFF_MS}, and scheduling the backoff window accordingly.
   * Global because all users share the same Spotify API credentials.
   *
   * @param retryAfterSeconds - Optional `Retry-After` header value from Spotify.
   */
  private recordRateLimit(retryAfterSeconds?: number): void {
    const next = Math.min(this.backoffDelayMs * 2, SpotifyService.MAX_BACKOFF_MS);
    // Apply ±10 % jitter to spread concurrent retries.
    const jitter = next * 0.1 * (Math.random() * 2 - 1);
    const delay = retryAfterSeconds != null ? retryAfterSeconds * 1_000 : next + jitter;
    this.backoffDelayMs = next;
    this.backoffUntil = Date.now() + delay;
  }

  /**
   * Clears the backoff state after a successful request.
   */
  private clearBackoff(): void {
    this.backoffUntil = 0;
    this.backoffDelayMs = SpotifyService.INITIAL_BACKOFF_MS;
  }

  /**
   * Handles a Spotify 429 response by updating the backoff window, logging the event,
   * and throwing a {@link SpotifyRateLimitError}.
   *
   * @param error   - The Axios error that carried the 429 status.
   * @param context - A short label used in the log message to identify the call site (e.g. `'token refresh'`).
   * @param userId  - The user ID to include in the log message.
   * @throws {@link SpotifyRateLimitError} Always.
   */
  private handleRateLimitError(axiosError: AxiosError, context: string, userId: string): never {
    const retryAfter = Number(axiosError.response?.headers['retry-after']) || undefined;
    this.recordRateLimit(retryAfter);
    const remaining = this.remainingBackoffMs();
    console.error(
      `[${SpotifyService.timestamp()}] ${context} rate-limited for user ${userId} — backing off ${remaining} ms`,
    );
    throw new SpotifyRateLimitError(remaining);
  }

  /**
   * Returns a valid access token for the given user, refreshing it via the Spotify
   * OAuth token endpoint if the cached token is absent or within 60 seconds of expiry.
   *
   * @remarks
   * Throws immediately — without making a network request — if the service is currently
   * in a global backoff window from a prior 429 response.
   *
   * @param user - The user whose access token to retrieve or refresh.
   * @returns A valid Spotify access token string.
   *
   * @throws {@link SpotifyRateLimitError} When the service is backed off or the token
   *   endpoint responds with HTTP 429.
   * @throws {@link SpotifyTokenRefreshError} On any other token refresh failure.
   */
  private async ensureAccessToken(user: User): Promise<string> {
    if (this.isBackedOff()) {
      const remaining = this.remainingBackoffMs();
      console.error(
        `[${SpotifyService.timestamp()}] Spotify token refresh skipped for user ${user.id} — rate limit backoff active, retry in ${remaining} ms`,
      );
      throw new SpotifyRateLimitError(remaining);
    }

    const now = Date.now();
    const currentToken = this.accessTokens.get(user.id);
    const expiration = this.tokenExpirations.get(user.id) || 0;

    if (currentToken && now < expiration - 60000) {
      return currentToken;
    }

    const authHeader = Buffer.from(
      `${this.configService.getSpotifyConfig().clientId}:${this.configService.getSpotifyConfig().clientSecret}`,
    ).toString('base64');

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: user.spotifyRefreshToken,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authHeader}`,
          },
        },
      );

      const data = response.data;
      const newToken = data.access_token;

      this.accessTokens.set(user.id, newToken);
      this.tokenExpirations.set(user.id, now + data.expires_in * 1000);
      this.clearBackoff();

      return newToken;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        this.handleRateLimitError(error, 'Spotify token refresh', user.id);
      }
      console.error(
        `[${SpotifyService.timestamp()}] Failed to refresh Spotify token for user ${user.id}:`,
        error,
      );
      throw new SpotifyTokenRefreshError(
        `Failed to refresh Spotify token for user ${user.id}: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Maps a raw Spotify API playback item to a {@link TrackState} DTO.
   *
   * @param isPlaying - Whether the item is currently playing.
   * @param item      - The raw Spotify track or episode object.
   * @returns A normalized {@link TrackState} describing the current playback.
   */
  private mapItemToTrackState(
    isPlaying: boolean,
    item: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObjectFull,
  ): TrackState {
    let songName = 'Unknown Song';
    let artistName = 'Unknown Artist';

    if (item.type === 'track') {
      const track = item as SpotifyApi.TrackObjectFull;
      songName = track.name;
      artistName = track.artists.map((a) => a.name).join(', ');
    } else if (item.type === 'episode') {
      const episode = item as SpotifyApi.EpisodeObjectFull;
      songName = episode.name;
      artistName = episode.show.name;
    }

    return { isPlaying, songName, artistName, type: item.type as 'track' | 'episode' };
  }

  /**
   * Fetches the currently playing track or podcast episode for the given user.
   *
   * @remarks
   * Returns `null` when Spotify reports no active playback (HTTP 204 or an empty response).
   * Throws {@link SpotifyRateLimitError} immediately — without making a network request — when
   * the service is in an active backoff window.  On a live 429 response the backoff window is
   * updated before throwing.
   *
   * @param user - The user whose Spotify playback state should be fetched.
   * @returns The current {@link TrackState}, or `null` if nothing is playing.
   *
   * @throws {@link SpotifyRateLimitError} When rate-limited (either backed off or live 429).
   * @throws {@link SpotifyCurrentlyPlayingError} On any other API failure.
   *
   * @public
   */
  public async getCurrentlyPlaying(user: User): Promise<TrackState | null> {
    if (this.isBackedOff()) {
      const remaining = this.remainingBackoffMs();
      console.error(
        `[${SpotifyService.timestamp()}] getCurrentlyPlaying skipped for user ${user.id} — rate limit backoff active, retry in ${remaining} ms`,
      );
      throw new SpotifyRateLimitError(remaining);
    }

    const token = await this.ensureAccessToken(user);

    try {
      const response = await axios.get<SpotifyApi.CurrentlyPlayingResponse>(
        'https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode',
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.status === 204 || !response.data || !response.data.item) {
        return null;
      }

      const trackState = this.mapItemToTrackState(response.data.is_playing, response.data.item);
      this.clearBackoff();
      return trackState;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        this.handleRateLimitError(error, 'getCurrentlyPlaying', user.id);
      }
      console.error(
        `[${SpotifyService.timestamp()}] Error fetching currently playing track from Spotify:`,
        error,
      );
      throw new SpotifyCurrentlyPlayingError(
        `Error fetching currently playing track from Spotify: ${(error as Error).message}`,
      );
    }
  }
}
