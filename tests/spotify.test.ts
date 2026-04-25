import { MockSpotifyService } from '../src/spotify';

describe('MockSpotifyService', () => {
  it('should return null when initial state is not provided (defaulting to null / stopped)', async () => {
    const service = new MockSpotifyService();
    const state = await service.getCurrentlyPlaying();
    expect(state).toBeNull();
  });

  it('should return the provided initial state', async () => {
    const initialState = {
      isPlaying: true,
      songName: 'Test Song',
      artistName: 'Test Artist',
    };
    const service = new MockSpotifyService({ initialState });
    const state = await service.getCurrentlyPlaying();
    expect(state).toEqual(initialState);
  });

  it('should allow setting the mock state dynamically', async () => {
    const service = new MockSpotifyService();

    service.setMockState({
      isPlaying: false,
      songName: 'Paused Song',
      artistName: 'Paused Artist',
    });

    const state = await service.getCurrentlyPlaying();
    expect(state).toEqual({
      isPlaying: false,
      songName: 'Paused Song',
      artistName: 'Paused Artist',
    });
  });
});
