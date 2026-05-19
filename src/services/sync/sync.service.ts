/**
 * Status synchronization orchestrator.
 * @remarks
 * Manages the core business logic of polling Spotify for currently playing media and pushing status updates to the user's Slack profile.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { IConfigService } from '../config/types';
import { ISpotifyService } from '../spotify/types';
import { ISlackService } from '../slack/types';
import { IUserService, User } from '../user/types';
import { ISyncService } from './types';
import { SlackStatusSetError } from '../slack/errors';
import {
  SpotifyTokenRefreshError,
  SpotifyCurrentlyPlayingError,
  SpotifyRateLimitError,
} from '../spotify/errors';
import { TrackState } from '../spotify/types';

/**
 * Orchestrates Spotify-to-Slack status synchronization.
 *
 * @remarks
 * Polls the Spotify API for active users and updates their Slack profile status accordingly. Manages its own background loop and error isolation per user.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SyncService([SyncService]) -->|Implements| ISyncService[ISyncService]
 * SyncService -->|Uses| IUserService[IUserService]
 * SyncService -->|Uses| ISpotifyService[ISpotifyService]
 * SyncService -->|Uses| ISlackService[ISlackService]
 * Client[App Bootstrap] -.->|Instantiates| SyncService
 * ```
 *
 * @example
 * ```typescript
 * const syncService = new SyncService(userService, spotifyService, slackService);
 * ```
 *
 * @public
 */
export class SyncService implements ISyncService {
  /** Handle to the active polling timer, used to cancel the loop on `stop()`. */
  private timer: NodeJS.Timeout | null = null;

  /** Whether the polling loop is currently active. */
  private isRunning: boolean = false;

  /**
   * Cache of the last-known playback state key per user ID.
   * Used to suppress redundant Slack updates when nothing has changed.
   */
  private userStates: Map<string, string> = new Map();

  /**
   * When set, overrides `pollIntervalMs` for the next scheduling cycle.
   * Used to honour the backoff window returned by a {@link SpotifyRateLimitError}.
   * Reset to `null` automatically after being consumed by `runLoop`.
   */
  private nextPollDelayMs: number | null = null;

  /**
   * @param spotify       - Spotify API service for fetching playback state.
   * @param slack         - Slack API service for updating user profile statuses.
   * @param userService   - Service for retrieving active users to sync.
   * @param configService - Application configuration provider.
   */
  constructor(
    private spotify: ISpotifyService,
    private slack: ISlackService,
    private userService: IUserService,
    private configService: IConfigService,
  ) {}

  /**
   * Starts the background polling loop.
   *
   * @remarks
   * No-ops if the service is already running. Logs the configured poll interval on startup.
   *
   * @public
   */
  public start(): void {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    console.log(
      `SyncService started. Polling every ${this.configService.getBotConfig().pollIntervalMs}ms.`,
    );
    this.runLoop();
  }

  /**
   * Stops the background polling loop and cancels any pending timer.
   *
   * @public
   */
  public stop(): void {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    console.log('SyncService stopped.');
  }

  /**
   * Core polling loop. Calls {@link syncNow} then re-schedules itself using either
   * the standard `pollIntervalMs` or the override stored in `nextPollDelayMs`
   * (consumed and cleared after each use).
   */
  private async runLoop(): Promise<void> {
    if (!this.isRunning) return;

    await this.syncNow();

    if (this.isRunning) {
      const delay = this.nextPollDelayMs ?? this.configService.getBotConfig().pollIntervalMs;
      this.nextPollDelayMs = null; // consume — subsequent cycles return to the standard interval
      this.timer = setTimeout(() => this.runLoop(), delay);
    }
  }

  /**
   * Performs a single synchronization pass across all active users.
   *
   * @remarks
   * For each user, fetches the current Spotify playback state and, if it has changed
   * since the last poll, updates or clears their Slack status accordingly.
   * Per-user errors are isolated so one failure does not prevent other users from syncing.
   * If a {@link SpotifyRateLimitError} is caught, `nextPollDelayMs` is updated so the
   * subsequent `runLoop` tick respects the backoff window.
   *
   * @public
   */
  public async syncNow(): Promise<void> {
    try {
      const activeUsers = await this.userService.getActiveUsers();

      for (const user of activeUsers) {
        try {
          const track = await this.spotify.getCurrentlyPlaying(user);
          const stateKey = this.buildTrackStateKey(track);

          if (this.isStateKeyUnchanged(user.id, stateKey)) continue;

          if (this.isTrackOfSyncedType(track, user)) {
            const emoji = this.resolveEmoji(track!, user);
            const statusText = this.buildStatusText(track!, user);
            await this.applyStatusWithFallback(user, track!, statusText, emoji);
          } else {
            await this.clearStatusSafely(user);
          }

          this.userStates.set(user.id, stateKey);
        } catch (error) {
          const delay = this.handleUserSyncErrorandGetBackoffDelay(error, user);
          if (delay !== null) this.nextPollDelayMs = delay;
        }
      }
    } catch (error) {
      console.error('Error during sync:', error);
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers — state & guards
  // ---------------------------------------------------------------------------

  /**
   * Encodes the current playback into a stable string used for change-detection.
   * An empty string signals that nothing is playing.
   *
   * @param track - The current playback state, or `null` if nothing is playing.
   * @returns A colon-delimited key string, or `''` when `track` is `null`.
   */
  private buildTrackStateKey(track: TrackState | null): string {
    if (!track) return '';
    return `${track.isPlaying ? 'playing' : 'paused'}:${track.type ?? 'track'}:${track.songName}:${track.artistName}`;
  }

  /**
   * Returns `true` when the new state key matches what was recorded on the last cycle,
   * indicating that no Slack update is needed.
   *
   * @param userId - The user whose last-known state key to compare against.
   * @param key    - The freshly computed state key.
   * @returns `true` if the state is unchanged; `false` if a Slack update is required.
   */
  private isStateKeyUnchanged(userId: string, key: string): boolean {
    return key === (this.userStates.get(userId) ?? null);
  }

  /**
   * Returns `true` when the track is something we should set a Slack status for.
   * Returns `false` for a null track (nothing playing) or for podcast episodes when
   * the user has disabled podcast syncing.
   *
   * @param track - The current playback state, or `null`.
   * @param user  - The user whose sync preferences to consult.
   * @returns `true` if a status update should be applied; `false` if the status should be cleared.
   */
  private isTrackOfSyncedType(track: TrackState | null, user: User): boolean {
    if (!track) return false;
    if (track.type === 'episode' && !user.syncPodcasts) return false;
    return true;
  }

  // ---------------------------------------------------------------------------
  // Private helpers — status composition
  // ---------------------------------------------------------------------------

  /**
   * Picks the appropriate Slack emoji from the user's profile based on media type
   * and whether the track is currently playing or paused.
   *
   * @param track - The current playback state.
   * @param user  - The user whose configured emoji preferences to use.
   * @returns The emoji string to use in the Slack status.
   */
  private resolveEmoji(track: TrackState, user: User): string {
    if (track.type === 'episode') {
      return track.isPlaying ? user.podcastStatusEmoji : user.podcastPausedEmoji;
    }
    return track.isPlaying ? user.statusEmoji : user.pausedEmoji;
  }

  /**
   * Selects the user's configured format string for the media type and substitutes
   * track/episode tokens into it.
   *
   * @param track - The current playback state supplying token values.
   * @param user  - The user whose status format strings to use.
   * @returns The fully-substituted status text string.
   */
  private buildStatusText(track: TrackState, user: User): string {
    if (track.type === 'episode') {
      let text = user.podcastStatusFormat;
      if (track.artistName) text = text.replace('{podcast name}', track.artistName);
      if (track.songName) text = text.replace('{episode title}', track.songName);
      return text;
    }
    let text = user.statusFormat;
    if (track.songName) text = text.replace('{song}', track.songName);
    if (track.artistName) text = text.replace('{artist}', track.artistName);
    return text;
  }

  // ---------------------------------------------------------------------------
  // Private helpers — Slack actions
  // ---------------------------------------------------------------------------

  /**
   * Calls `slack.setStatus`. On a {@link SlackStatusSetError} resolves a default system
   * emoji and retries once before giving up. Non-`SlackStatusSetError` failures are
   * logged and swallowed so the sync loop can continue.
   *
   * @param user       - The user whose Slack status to update.
   * @param track      - The current playback state (used to determine the fallback emoji).
   * @param statusText - The fully-substituted status text string.
   * @param emoji      - The preferred emoji for the status update.
   */
  private async applyStatusWithFallback(
    user: User,
    track: TrackState,
    statusText: string,
    emoji: string,
  ): Promise<void> {
    try {
      await this.slack.setStatus(user, statusText, emoji);
    } catch (error) {
      if (!(error instanceof SlackStatusSetError)) {
        console.error(`Unexpected error updating status for ${user.slackUserId}:`, error);
        return;
      }

      console.warn(
        `Failed to update Slack status for ${user.slackUserId} with emoji "${emoji}". Retrying with default emoji...`,
        error.message,
      );

      const isEpisode = track.type === 'episode';
      let defaultEmoji: string;
      if (isEpisode) {
        defaultEmoji = track.isPlaying ? ':microphone:' : ':double_vertical_bar:';
      } else {
        const botConfig = this.configService.getBotConfig();
        defaultEmoji = track.isPlaying ? botConfig.statusEmoji : botConfig.pausedEmoji;
      }

      try {
        await this.slack.setStatus(user, statusText, defaultEmoji);
        console.log(
          `Successfully updated Slack status for ${user.slackUserId} using fallback emoji.`,
        );
      } catch (fallbackError) {
        console.error(
          `Failed to update Slack status for ${user.slackUserId} even with fallback emoji:`,
          fallbackError instanceof Error ? fallbackError.message : fallbackError,
        );
      }
    }
  }

  /**
   * Clears the user's Slack status, swallowing and logging any errors so a single
   * failure does not abort the rest of the sync loop.
   *
   * @param user - The user whose Slack status to clear.
   */
  private async clearStatusSafely(user: User): Promise<void> {
    try {
      await this.slack.clearStatus(user);
    } catch (error) {
      console.error(`Error clearing status for ${user.slackUserId}:`, error);
    }
  }

  // ---------------------------------------------------------------------------
  // Private helpers — error handling
  // ---------------------------------------------------------------------------

  /**
   * Classifies a per-user sync error, logs it at the appropriate level, and returns
   * the next poll delay in milliseconds when a rate-limit backoff should be applied,
   * or `null` when the standard interval should be used.
   *
   * @remarks
   * For {@link SpotifyRateLimitError}, the delay is taken directly from
   * {@link SpotifyRateLimitError.retryAfterMs}. For known Spotify errors the failure
   * is logged at `error` level. All other errors are also logged and return `null`.
   *
   * @param error - The caught error value from the per-user try/catch.
   * @param user  - The user being synced when the error occurred (used in log messages).
   * @returns The backoff delay in ms to apply before the next poll, or `null`.
   */
  private handleUserSyncErrorandGetBackoffDelay(error: unknown, user: User): number | null {
    if (error instanceof SpotifyRateLimitError) {
      // Last-write-wins: if multiple users hit the limit in the same cycle the final
      // value is used — all errors share the same global backoff window anyway.
      console.warn(
        `Spotify rate limit active — next poll delayed ${error.retryAfterMs} ms (triggered by user ${user.slackUserId})`,
      );
      return error.retryAfterMs;
    }
    if (
      error instanceof SpotifyTokenRefreshError ||
      error instanceof SpotifyCurrentlyPlayingError
    ) {
      console.error(`Spotify sync failed for user ${user.slackUserId}:`, error.message);
      return null;
    }
    console.error(`Unexpected error during sync for user ${user.slackUserId}:`, error);
    return null;
  }
}
