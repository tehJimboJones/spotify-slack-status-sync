import { SyncService } from '../src/sync';
import { ISpotifyService, TrackState } from '../src/spotify';
import { ISlackService } from '../src/slack';
import { AppConfig } from '../src/config';

describe('SyncService', () => {
  let mockSpotify: jest.Mocked<ISpotifyService>;
  let mockSlack: jest.Mocked<ISlackService>;
  let mockConfig: AppConfig;
  let service: SyncService;

  beforeEach(() => {
    jest.useFakeTimers();

    mockSpotify = {
      getCurrentlyPlaying: jest.fn(),
    };

    mockSlack = {
      setStatus: jest.fn(),
      clearStatus: jest.fn(),
    };

    mockConfig = {
      spotify: { clientId: '', clientSecret: '', redirectUri: '', refreshToken: '' },
      slack: { userToken: '', signingSecret: '' },
      bot: {
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':double_vertical_bar:',
        statusFormat: '{song} - {artist}',
      },
    };

    service = new SyncService(mockSpotify, mockSlack, mockConfig);
  });

  afterEach(() => {
    service.stop();
    jest.clearAllTimers();
  });

  it('should format status text correctly when playing', async () => {
    const track: TrackState = { isPlaying: true, songName: 'Test Song', artistName: 'Test Artist' };
    mockSpotify.getCurrentlyPlaying.mockResolvedValue(track);

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledWith('Test Song - Test Artist', ':headphones:');
  });

  it('should use paused emoji when paused', async () => {
    const track: TrackState = {
      isPlaying: false,
      songName: 'Test Song',
      artistName: 'Test Artist',
    };
    mockSpotify.getCurrentlyPlaying.mockResolvedValue(track);

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledWith(
      'Test Song - Test Artist',
      ':double_vertical_bar:',
    );
  });

  it('should clear status when stopped (null track)', async () => {
    mockSpotify.getCurrentlyPlaying.mockResolvedValue(null);

    await service.syncNow();

    expect(mockSlack.clearStatus).toHaveBeenCalled();
  });

  it('should not update slack if state has not changed', async () => {
    const track: TrackState = { isPlaying: true, songName: 'Test Song', artistName: 'Test Artist' };
    mockSpotify.getCurrentlyPlaying.mockResolvedValue(track);

    await service.syncNow();
    expect(mockSlack.setStatus).toHaveBeenCalledTimes(1);

    // Call syncNow again with the same track state
    await service.syncNow();
    expect(mockSlack.setStatus).toHaveBeenCalledTimes(1); // Should still be 1
  });

  it('should call syncNow periodically when started', () => {
    service.syncNow = jest.fn(); // Mock the syncNow method itself to track calls
    service.start();
    // Start calls it once immediately
    expect(service.syncNow).toHaveBeenCalledTimes(1);

    // Fast-forward time by 1 interval
    jest.advanceTimersByTime(60000);
    expect(service.syncNow).toHaveBeenCalledTimes(2);

    // Fast-forward time by another interval
    jest.advanceTimersByTime(60000);
    expect(service.syncNow).toHaveBeenCalledTimes(3);
  });

  it('should stop polling when stop is called', () => {
    service.syncNow = jest.fn();
    service.start();

    jest.advanceTimersByTime(60000);
    expect(service.syncNow).toHaveBeenCalledTimes(2); // 1 immediate + 1 from interval

    service.stop();

    jest.advanceTimersByTime(60000);
    expect(service.syncNow).toHaveBeenCalledTimes(2); // Should not increase
  });
});
