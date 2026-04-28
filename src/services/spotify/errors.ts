import { AppError } from '../../errors';

export class SpotifyTokenRefreshError extends AppError {
  constructor(message: string = 'Failed to refresh Spotify token') {
    super(message, 'SPOTIFY_TOKEN_REFRESH_ERROR');
  }
}

export class SpotifyCurrentlyPlayingError extends AppError {
  constructor(message: string = 'Failed to fetch currently playing track from Spotify') {
    super(message, 'SPOTIFY_CURRENTLY_PLAYING_ERROR');
  }
}
