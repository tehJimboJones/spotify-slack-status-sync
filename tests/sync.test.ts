import { SyncService } from '../src/services/sync/sync.service';
import { ISpotifyService } from '../src/services/spotify/types';
import { ISlackService } from '../src/services/slack/types';
import { IConfigService } from '../src/services/config/types';
import { IUserService, User } from '../src/services/user/types';

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
});
