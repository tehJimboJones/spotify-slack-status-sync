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
import axios from 'axios';
import { IConfigService } from '../config/types';
import { User } from '../user/types';
import { ISpotifyService, TrackState } from './types';
import { SpotifyTokenRefreshError, SpotifyCurrentlyPlayingError } from './errors';

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
  private accessTokens: Map<string, string> = new Map();
  private tokenExpirations: Map<string, number> = new Map();

  constructor(private configService: IConfigService) {}

  private async ensureAccessToken(user: User): Promise<string> {
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

      return newToken;
    } catch (error) {
      console.error(`Failed to refresh Spotify token for user ${user.id}:`, error);
      throw new SpotifyTokenRefreshError(
        `Failed to refresh Spotify token for user ${user.id}: ${(error as Error).message}`,
      );
    }
  }

  public async getCurrentlyPlaying(user: User): Promise<TrackState | null> {
    const token = await this.ensureAccessToken(user);

    try {
      const response = await axios.get<SpotifyApi.CurrentlyPlayingResponse>(
        'https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 204 || !response.data || !response.data.item) {
        return null;
      }

      const isPlaying = response.data.is_playing;
      const item = response.data.item;

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

      return {
        isPlaying,
        songName,
        artistName,
        type: item.type as 'track' | 'episode',
      };
    } catch (error) {
      console.error('Error fetching currently playing track from Spotify:', error);
      throw new SpotifyCurrentlyPlayingError(
        `Error fetching currently playing track from Spotify: ${(error as Error).message}`,
      );
    }
  }
}
