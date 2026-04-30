/**
 * Mock implementation of the Spotify service.
 * @remarks
 * Provides a stubbed version of the Spotify API wrapper for testing purposes, returning predictable mock data without external requests.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { User } from '../user/types';
import { ISpotifyService, TrackState, MockSpotifyConfig } from './types';

/**
 * Mock implementation of the Spotify service.
 *
 * @remarks
 * Provides predictable, configurable dummy data for Spotify API interactions, enabling deterministic unit testing of dependent services.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * MockSpotifyService([MockSpotifyService]) -->|Implements| ISpotifyService[ISpotifyService]
 * Client[Test Suite] -.->|Instantiates| MockSpotifyService
 * ```
 *
 * @example
 * ```typescript
 * const spotifyService = new MockSpotifyService();
 * ```
 *
 * @public
 */
export class MockSpotifyService implements ISpotifyService {
  private currentState: TrackState | null;

  constructor(config?: MockSpotifyConfig) {
    this.currentState = config?.initialState !== undefined ? config.initialState : null;
  }

  public async getCurrentlyPlaying(user: User): Promise<TrackState | null> {
    return {
      artistName: `Mock Artist for ${user.slackUserId}`,
      songName: 'Mock Song',
      isPlaying: true,
    };
  }

  public setMockState(state: TrackState | null): void {
    this.currentState = state;
  }
}
