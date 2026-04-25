/**
 * Spotify service module.
 * Provides data models and interfaces for interacting with the Spotify API.
 */

/**
 * Represents the current playback state of a track on Spotify.
 */
export interface TrackState {
  isPlaying: boolean;
  songName?: string;
  artistName?: string;
}

export interface ISpotifyService {
  /**
   * Fetches the currently playing track.
   * @returns TrackState if a session is active (playing or paused), null if stopped (204 No Content)
   */
  getCurrentlyPlaying(): Promise<TrackState | null>;
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
   * @param {MockSpotifyConfig} [config] - Optional configuration with an initial state.
   */
  constructor(config?: MockSpotifyConfig) {
    this.currentState = config?.initialState !== undefined ? config.initialState : null;
  }

  public async getCurrentlyPlaying(): Promise<TrackState | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));
    return this.currentState;
  }

  /**
   * Dynamically sets the simulated state for testing purposes.
   *
   * @param {TrackState | null} state - The new track state to simulate.
   */
  public setMockState(state: TrackState | null): void {
    this.currentState = state;
  }
}
