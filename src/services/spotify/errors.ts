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

/**
 * Exception thrown when the Spotify service is in an active exponential-backoff window.
 *
 * @remarks
 * Raised immediately (without making a network request) whenever a caller attempts to reach
 * Spotify while the service is still waiting out a prior 429 rate-limit response.  Callers
 * should inspect {@link SpotifyRateLimitError.retryAfterMs} to know how long to wait.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SpotifyRateLimitError([SpotifyRateLimitError]) -->|Extends| AppError[AppError]
 * SpotifyService[SpotifyService] -.-|Throws| SpotifyRateLimitError
 * ```
 *
 * @example
 * ```typescript
 * throw new SpotifyRateLimitError(12_000);
 * ```
 *
 * @public
 */
export class SpotifyRateLimitError extends AppError {
  /** Milliseconds remaining in the current backoff window. */
  readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super(`Spotify rate limit active — retry in ${retryAfterMs} ms`, 'SPOTIFY_RATE_LIMIT_ERROR');
    this.retryAfterMs = retryAfterMs;
  }
}
