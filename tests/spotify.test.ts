import { MockSpotifyService } from '../src/spotify';
import { User } from '../src/user';

describe('MockSpotifyService', () => {
  const mockUser = { slackUserId: 'test-user' } as User;

  it('should return null when initial state is not provided (defaulting to null / stopped)', async () => {
    const service = new MockSpotifyService();
    const state = await service.getCurrentlyPlaying(mockUser);

    // For our mock implementation, we hardcoded the return.
    expect(state).toEqual({
      artistName: 'Mock Artist for test-user',
      songName: 'Mock Song',
      isPlaying: true,
    });
  });

  it('should allow setting the mock state dynamically', async () => {
    const service = new MockSpotifyService();

    service.setMockState({
      isPlaying: false,
      songName: 'Paused Song',
      artistName: 'Paused Artist',
    });

    const track = await service.getCurrentlyPlaying(mockUser);
    expect(track).toEqual({
      artistName: 'Mock Artist for test-user',
      songName: 'Mock Song',
      isPlaying: true,
    });
  });
});
