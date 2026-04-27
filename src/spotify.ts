/**
 * Spotify service module.
 * Provides data models and interfaces for interacting with the Spotify API.
 */

import { User } from './user';

/**
 * Represents the current playback state of a track on Spotify.
 */
export interface TrackState {
  isPlaying: boolean;
  songName?: string;
  artistName?: string;
  type?: 'track' | 'episode';
}

/**
 * Interface defining the operations for interacting with Spotify.
 */
export interface ISpotifyService {
  /**
   * Fetches the currently playing track for the given user.
   *
   * @param user - The user whose track we are fetching.
   * @returns A promise resolving to the track state or null.
   */
  getCurrentlyPlaying(user: User): Promise<TrackState | null>;
}

/**
 * Configuration for the MockSpotifyService.
 */
export interface MockSpotifyConfig {
  initialState?: TrackState | null;
}

/**
 * A mock implementation of the Spotify service for testing and initial development.
 */
export class MockSpotifyService implements ISpotifyService {
  private currentState: TrackState | null;

  /**
   * Constructs a new MockSpotifyService.
   *
   * @param config - Optional configuration with an initial state.
   */
  constructor(config?: MockSpotifyConfig) {
    this.currentState = config?.initialState !== undefined ? config.initialState : null;
  }

  /**
   * Simulates fetching the currently playing track for a user.
   *
   * @param user - The user whose track we are fetching.
   * @returns A promise resolving to the track state or null.
   */
  public async getCurrentlyPlaying(user: User): Promise<TrackState | null> {
    // For mock testing, we'll return a static track or null
    return {
      artistName: `Mock Artist for ${user.slackUserId}`,
      songName: 'Mock Song',
      isPlaying: true,
    };
  }

  /**
   * Dynamically sets the simulated state for testing purposes.
   *
   * @param state - The new track state to simulate.
   */
  public setMockState(state: TrackState | null): void {
    this.currentState = state;
  }
}
