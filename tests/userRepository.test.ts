import { MockUserRepository } from '../src/user';
import { AppConfig } from '../src/config';

describe('MockUserRepository', () => {
  let mockConfig: AppConfig;
  let repository: MockUserRepository;

  beforeEach(() => {
    mockConfig = {
      spotify: {
        clientId: 'client_id',
        clientSecret: 'client_secret',
        redirectUri: 'uri',
        refreshToken: 'mock_spotify_token',
      },
      slack: {
        clientId: 'id',
        clientSecret: 'secret',
        userToken: 'mock_slack_token',
        signingSecret: 'secret',
      },
      bot: {
        baseUrl: 'http://localhost:3000',
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':pause:',
        statusFormat: '{song}',
        port: 3000,
      },
      db: {
        dialect: 'sqlite',
        host: 'localhost',
        port: 3306,
        user: 'root',
        pass: '',
        name: 'test',
      },
    };

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
