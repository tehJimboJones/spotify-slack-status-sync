import { MockUserRepository } from '../src/services/user/mock-user.repository';
import { IConfigService } from '../src/services/config/types';

describe('MockUserRepository', () => {
  let mockConfig: IConfigService;
  let repository: MockUserRepository;

  beforeEach(() => {
    mockConfig = {
      getSpotifyConfig: () => ({
        clientId: 'client_id',
        clientSecret: 'client_secret',
        redirectUri: 'uri',
        refreshToken: 'mock_spotify_token',
      }),
      getSlackConfig: () => ({
        clientId: 'id',
        clientSecret: 'secret',
        userToken: 'mock_slack_token',
        signingSecret: 'secret',
      }),
      getBotConfig: () => ({
        baseUrl: 'http://localhost:3000',
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':pause:',
        statusFormat: '{song}',
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

    repository = new MockUserRepository(mockConfig);
  });

  it('should return the mocked user on findAll', async () => {
    const users = await repository.findAll();
    expect(users).toHaveLength(1);
    expect(users[0]).toMatchObject({
      slackUserToken: 'mock_slack_token',
      spotifyRefreshToken: 'mock_spotify_token',
      isSyncActive: true,
      statusEmoji: ':headphones:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });
  });

  it('should find user by slack ID', async () => {
    const users = await repository.findAll();
    const slackId = users[0].slackUserId;

    const user = await repository.findBySlackId(slackId);
    expect(user).not.toBeNull();
    expect(user?.slackUserId).toBe(slackId);
  });

  it('should update the user in memory', async () => {
    const users = await repository.findAll();
    const slackId = users[0].slackUserId;

    await repository.update(slackId, { isSyncActive: false, statusEmoji: ':new:' });

    const updatedUser = await repository.findBySlackId(slackId);
    expect(updatedUser?.isSyncActive).toBe(false);
    expect(updatedUser?.statusEmoji).toBe(':new:');
  });
});
