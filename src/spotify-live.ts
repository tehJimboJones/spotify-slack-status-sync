/**
 * Live Spotify service module.
 * Provides integration with the real Spotify API using OAuth 2.0.
 */
import axios from 'axios';
import { AppConfig } from './config';
import { ISpotifyService, TrackState } from './spotify';
import { User } from './user';

/**
 * Live implementation of the Spotify service.
 */
export class SpotifyService implements ISpotifyService {
  private accessTokens: Map<string, string> = new Map();
  private tokenExpirations: Map<string, number> = new Map();

  /**
   * Constructs a new SpotifyService.
   *
   * @param config - The application configuration.
   */
  constructor(private config: AppConfig) {}

  /**
   * Ensures the given user has a valid access token, refreshing if necessary.
   * @param user - The user whose token we are checking.
   * @returns The valid access token.
   */
  private async ensureAccessToken(user: User): Promise<string> {
    const now = Date.now();
    const currentToken = this.accessTokens.get(user.id);
    const expiration = this.tokenExpirations.get(user.id) || 0;

    // If we have a token and it hasn't expired (giving a 60s buffer), use it
    if (currentToken && now < expiration - 60000) {
      return currentToken;
    }

    // Otherwise, refresh the token using the user's refresh token
    const authHeader = Buffer.from(
      `${this.config.spotify.clientId}:${this.config.spotify.clientSecret}`,
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
      throw error;
    }
  }

  /**
   * Fetches the currently playing track from the live Spotify API for a given user.
   *
   * @param user - The user whose track we are fetching.
   * @returns The track state or null if nothing is playing/valid.
   */
  public async getCurrentlyPlaying(user: User): Promise<TrackState | null> {
    const token = await this.ensureAccessToken(user);

    try {
      const response = await axios.get<SpotifyApi.CurrentlyPlayingResponse>(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 204 No Content means nothing is currently playing
      if (response.status === 204 || !response.data || !response.data.item) {
        return null;
      }

      const isPlaying = response.data.is_playing;
      const item = response.data.item;

      let songName = 'Unknown Song';
      let artistName = 'Unknown Artist';

      // The item can be a TrackObjectFull or EpisodeObjectFull
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
      };
    } catch (error) {
      console.error('Error fetching currently playing track from Spotify:', error);
      throw error;
    }
  }
}
