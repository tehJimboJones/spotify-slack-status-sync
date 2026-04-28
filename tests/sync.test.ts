import { SyncService } from '../src/services/sync/sync.service';
import { ISpotifyService } from '../src/services/spotify/types';
import { ISlackService } from '../src/services/slack/types';
import { IConfigService } from '../src/services/config/types';
import { IUserService, User } from '../src/services/user/types';
import { SlackStatusSetError } from '../src/services/slack/errors';

describe('SyncService', () => {
  let mockSpotify: jest.Mocked<ISpotifyService>;
  let mockSlack: jest.Mocked<ISlackService>;
  let mockUserService: jest.Mocked<IUserService>;
  let mockConfig: IConfigService;
  let service: SyncService;

  beforeEach(() => {
    jest.useFakeTimers();

    mockSpotify = {
      getCurrentlyPlaying: jest.fn(),
    };

    mockSlack = {
      sendMessage: jest.fn().mockResolvedValue({ channel: 'C123', messageTimestamp: 'new_ts' }),
      updateMessage: jest.fn().mockResolvedValue(undefined),
      setStatus: jest.fn().mockResolvedValue(undefined),
      clearStatus: jest.fn().mockResolvedValue(undefined),
      start: jest.fn().mockResolvedValue(undefined),
      registerCommandListener: jest.fn(),
      registerViewListener: jest.fn(),
      registerEventListener: jest.fn(),
      openSettingsModal: jest.fn(),
    } as unknown as jest.Mocked<ISlackService>;

    mockUserService = {
      getUser: jest.fn().mockResolvedValue(null),
      getActiveUsers: jest.fn().mockResolvedValue([]),
      toggleUserSync: jest.fn().mockResolvedValue(undefined),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };

    mockConfig = {
      getSpotifyConfig: () => ({
        clientId: 'id',
        clientSecret: 'secret',
        redirectUri: 'uri',
        refreshToken: 'token',
      }),
      getSlackConfig: () => ({
        clientId: 'slack-id',
        clientSecret: 'slack-secret',
        userToken: 'xoxp-test',
        signingSecret: 'secret',
      }),
      getBotConfig: () => ({
        baseUrl: 'http://localhost:3000',
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':double_vertical_bar:',
        statusFormat: '{song} - {artist}',
        port: 3000,
      }),
      getDbConfig: () => ({
        dialect: 'sqlite',
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: '',
        name: 'test',
      }),
    } as unknown as IConfigService;

    service = new SyncService(mockSpotify, mockSlack, mockUserService, mockConfig);
  });

  afterEach(() => {
    service.stop();
    jest.useRealTimers();
  });

  it('should synchronize multiple active users independently', async () => {
    const userA = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;
    const userB = {
      id: 'u2',
      slackUserId: 'B',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([userA, userB]);

    // Mock Spotify to return different songs for each user
    mockSpotify.getCurrentlyPlaying.mockImplementation(async (user: User) => {
      if (user.id === 'u1') return { isPlaying: true, songName: 'Song A', artistName: 'Artist A' };
      if (user.id === 'u2') return { isPlaying: true, songName: 'Song B', artistName: 'Artist B' };
      return null;
    });

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledTimes(2);
    expect(mockSlack.setStatus).toHaveBeenCalledWith(userA, 'Song A', ':headphones:');
    expect(mockSlack.setStatus).toHaveBeenCalledWith(userB, 'Song B', ':headphones:');
  });

  it('should maintain distinct cache states per user', async () => {
    const userA = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;
    const userB = {
      id: 'u2',
      slackUserId: 'B',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([userA, userB]);

    // First sync: both users listening
    mockSpotify.getCurrentlyPlaying.mockResolvedValue({
      isPlaying: true,
      songName: 'Initial Song',
    });
    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledTimes(2);
    mockSlack.setStatus.mockClear();

    // Second sync: User A song changes, User B remains the same
    mockSpotify.getCurrentlyPlaying.mockImplementation(async (user: User) => {
      if (user.id === 'u1') return { isPlaying: true, songName: 'New Song' };
      if (user.id === 'u2') return { isPlaying: true, songName: 'Initial Song' };
      return null;
    });
    await service.syncNow();

    // Only User A should trigger a Slack update
    expect(mockSlack.setStatus).toHaveBeenCalledTimes(1);
    expect(mockSlack.setStatus).toHaveBeenCalledWith(userA, 'New Song', ':headphones:');
  });

  it('should clear status if listening to an episode and syncPodcasts is false', async () => {
    const user = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
      syncPodcasts: false,
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user]);
    mockSpotify.getCurrentlyPlaying.mockResolvedValue({
      isPlaying: true,
      songName: 'Episode 1',
      artistName: 'Podcast A',
      type: 'episode',
    });

    await service.syncNow();

    expect(mockSlack.clearStatus).toHaveBeenCalledWith(user);
    expect(mockSlack.setStatus).not.toHaveBeenCalled();
  });

  it('should format status correctly for an episode if syncPodcasts is true', async () => {
    const user = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
      syncPodcasts: true,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user]);
    mockSpotify.getCurrentlyPlaying.mockResolvedValue({
      isPlaying: true,
      songName: 'Episode 1',
      artistName: 'Podcast A',
      type: 'episode',
    });

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledWith(user, 'Podcast A - Episode 1', ':microphone:');
    expect(mockSlack.clearStatus).not.toHaveBeenCalled();
  });

  it('should retry setStatus with a fallback emoji if the initial setStatus call throws an error', async () => {
    const user = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':invalid_emoji:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user]);
    mockSpotify.getCurrentlyPlaying.mockResolvedValue({
      isPlaying: true,
      songName: 'Song A',
      artistName: 'Artist A',
    });

    // Mock first call to reject, second call to resolve
    mockSlack.setStatus
      .mockRejectedValueOnce(new SlackStatusSetError('invalid_emoji'))
      .mockResolvedValueOnce(undefined);

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledTimes(2);
    // First attempt with user's invalid emoji
    expect(mockSlack.setStatus).toHaveBeenNthCalledWith(1, user, 'Song A', ':invalid_emoji:');
    // Second attempt with fallback bot emoji
    expect(mockSlack.setStatus).toHaveBeenNthCalledWith(2, user, 'Song A', ':headphones:');
  });

  it('should handle failure gracefully when fallback emoji also throws an error', async () => {
    const user = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':invalid_emoji:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user]);
    mockSpotify.getCurrentlyPlaying.mockResolvedValue({
      isPlaying: true,
      songName: 'Song A',
      artistName: 'Artist A',
    });

    // Mock all calls to reject
    mockSlack.setStatus.mockRejectedValue(new SlackStatusSetError('fatal_error'));

    // Should not throw and crash the sync loop
    await expect(service.syncNow()).resolves.not.toThrow();

    expect(mockSlack.setStatus).toHaveBeenCalledTimes(2);
  });

  it('should not crash the sync loop if clearStatus throws an error', async () => {
    const user = {
      id: 'u1',
      slackUserId: 'A',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user]);
    mockSpotify.getCurrentlyPlaying.mockResolvedValue(null);

    mockSlack.clearStatus.mockRejectedValue(new Error('clear_status_error'));

    await expect(service.syncNow()).resolves.not.toThrow();
    expect(mockSlack.clearStatus).toHaveBeenCalledWith(user);
  });

  it('should continue syncing other users if spotify fetch fails for one user', async () => {
    const user1 = { id: 'u1', slackUserId: 'A' } as User;
    const user2 = {
      id: 'u2',
      slackUserId: 'B',
      statusEmoji: ':headphones:',
      statusFormat: '{song}',
    } as User;

    mockUserService.getActiveUsers.mockResolvedValue([user1, user2]);

    mockSpotify.getCurrentlyPlaying.mockImplementation(async (u) => {
      if (u.id === 'u1') throw new Error('Spotify API down for U1');
      return { isPlaying: true, songName: 'Song B', artistName: 'Artist B', type: 'track' };
    });

    await service.syncNow();

    expect(mockSlack.setStatus).toHaveBeenCalledTimes(1);
    expect(mockSlack.setStatus).toHaveBeenCalledWith(user2, 'Song B', ':headphones:');
  });
});
