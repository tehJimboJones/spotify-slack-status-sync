/**
 * Spotify service specific errors.
 * @remarks
 * Defines custom exceptions for Spotify API interactions, such as authentication failures or rate limit violations.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { AppError } from '../../errors';

/**
 * Exception for Spotify OAuth token refresh failures.
 *
 * @remarks
 * Thrown when the application fails to obtain a new access token using a stored refresh token, often indicating revoked access.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SpotifyTokenRefreshError([SpotifyTokenRefreshError]) -->|Extends| AppError[AppError]
 * SpotifyService[SpotifyService] -.->|Throws| SpotifyTokenRefreshError
 * ```
 *
 * @example
 * ```typescript
 * throw new SpotifyTokenRefreshError('Invalid refresh token');
 * ```
 *
 * @public
 */
export class SpotifyTokenRefreshError extends AppError {
  constructor(message: string = 'Failed to refresh Spotify token') {
    super(message, 'SPOTIFY_TOKEN_REFRESH_ERROR');
  }
}

/**
 * Exception for Spotify playback retrieval failures.
 *
 * @remarks
 * Thrown when fetching the currently playing track/podcast fails, usually due to API downtime or rate limiting.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SpotifyCurrentlyPlayingError([SpotifyCurrentlyPlayingError]) -->|Extends| AppError[AppError]
 * SpotifyService[SpotifyService] -.->|Throws| SpotifyCurrentlyPlayingError
 * ```
 *
 * @example
 * ```typescript
 * throw new SpotifyCurrentlyPlayingError('Rate limit exceeded');
 * ```
 *
 * @public
 */
export class SpotifyCurrentlyPlayingError extends AppError {
  constructor(message: string = 'Failed to fetch currently playing track from Spotify') {
    super(message, 'SPOTIFY_CURRENTLY_PLAYING_ERROR');
  }
}
