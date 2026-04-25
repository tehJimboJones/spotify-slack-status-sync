/**
 * Live Spotify service module.
 * Provides integration with the real Spotify API using OAuth 2.0.
 */
import axios from 'axios';
import { AppConfig } from './config';
import { ISpotifyService, TrackState } from './spotify';

/**
 * Live implementation of the Spotify service.
 */
export class SpotifyService implements ISpotifyService {
  private accessToken: string | null = null;
  private tokenExpirationTime: number = 0;

  /**
   * Constructs a new SpotifyService.
   *
   * @param {AppConfig} config - The application configuration.
   */
  constructor(private config: AppConfig) {}

  /**
   * Refreshes the access token if it is expired or missing.
   */
  private async ensureAccessToken(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpirationTime) {
      return; // Token is still valid
    }

    const { clientId, clientSecret, refreshToken } = this.config.spotify;

    if (!refreshToken) {
      throw new Error('Spotify refresh token is missing in the configuration.');
    }

    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      },
    );

    this.accessToken = response.data.access_token;
    // Buffer expiration by 1 minute to ensure we don't use an expired token
    this.tokenExpirationTime = Date.now() + response.data.expires_in * 1000 - 60000;
  }

  /**
   * Fetches the currently playing track from the live Spotify API.
   *
   * @returns {Promise<TrackState | null>} A promise resolving to the track state or null if stopped.
   */
  public async getCurrentlyPlaying(): Promise<TrackState | null> {
    await this.ensureAccessToken();

    try {
      const response = await axios.get<SpotifyApi.CurrentlyPlayingResponse>(
        'https://api.spotify.com/v1/me/player/currently-playing',
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
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
