import { User } from '../user/types';

export interface TrackState {
  isPlaying: boolean;
  songName?: string;
  artistName?: string;
  type?: 'track' | 'episode';
}

export interface ISpotifyService {
  getCurrentlyPlaying(user: User): Promise<TrackState | null>;
}

export interface MockSpotifyConfig {
  initialState?: TrackState | null;
}
