/**
 * Type definitions for the Spotify service.
 * @remarks
 * Defines domain interfaces for Spotify integration, including playback state, track details, and podcast episode metadata.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { User } from '../user/types';

/**
 * Represents the current Spotify playback state.
 *
 * @remarks
 * A unified DTO representing either a currently playing music track or a podcast episode, abstracted from raw Spotify API responses.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * TrackState([TrackState])
 * ISpotifyService[ISpotifyService] -.->|Returns| TrackState
 * SyncService[SyncService] -.->|Consumes| TrackState
 * ```
 *
 * @example
 * ```typescript
 * const state: TrackState = { isPlaying: true, title: 'Song', artist: 'Artist' };
 * ```
 *
 * @public
 */
export interface TrackState {
  isPlaying: boolean;
  songName?: string;
  artistName?: string;
  type?: 'track' | 'episode';
}

/**
 * Interface for Spotify API interactions.
 *
 * @remarks
 * Abstracts the Spotify Web API, defining methods for authentication, token management, and fetching playback state.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ISpotifyService([ISpotifyService])
 * SpotifyService[SpotifyService] -->|Implements| ISpotifyService
 * SyncService[SyncService] -->|Uses| ISpotifyService
 * ```
 *
 * @example
 * ```typescript
 * const track = await spotifyService.getCurrentlyPlaying(user);
 * ```
 *
 * @public
 */
export interface ISpotifyService {
  getCurrentlyPlaying(user: User): Promise<TrackState | null>;
}

/**
 * Configuration options for the MockSpotifyService.
 *
 * @remarks
 * Allows tests to dynamically configure the behavior of the mocked Spotify service, such as simulating playback or forcing errors.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * MockSpotifyConfig([MockSpotifyConfig])
 * MockSpotifyService[MockSpotifyService] -.->|Consumes| MockSpotifyConfig
 * ```
 *
 * @example
 * ```typescript
 * const config: MockSpotifyConfig = { simulateError: true };
 * ```
 *
 * @public
 */
export interface MockSpotifyConfig {
  initialState?: TrackState | null;
}
