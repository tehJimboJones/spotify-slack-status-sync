import { User } from '../user/types';
import { ISpotifyService, TrackState, MockSpotifyConfig } from './types';

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
