import { SlackService } from '../src/slack';
import { AppConfig } from '../src/config';
import { App } from '@slack/bolt';
import { User } from '../src/user';

// Mock the @slack/bolt module
jest.mock('@slack/bolt', () => {
  const mApp = {
    client: {
      users: {
        profile: {
          set: jest.fn().mockResolvedValue({ ok: true }),
        },
      },
    },
    start: jest.fn().mockResolvedValue(undefined),
    command: jest.fn(),
  };
  return { App: jest.fn(() => mApp) };
});

describe('SlackService', () => {
  let mockConfig: AppConfig;
  let service: SlackService;

  beforeEach(() => {
    mockConfig = {
      spotify: {
        clientId: 'id',
        clientSecret: 'secret',
        redirectUri: 'uri',
        refreshToken: 'token',
      },
      slack: {
        clientId: 'slack-id',
        clientSecret: 'slack-secret',
        userToken: 'xoxp-test',
        signingSecret: 'secret',
      },
      bot: {
        baseUrl: 'http://localhost:3000',
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':pause:',
        statusFormat: '{song} - {artist}',
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

    // Clear all mocks before each test
    jest.clearAllMocks();

    service = new SlackService(mockConfig);
  });

  it('should initialize the bolt app with the correct credentials', () => {
    expect(App).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'xoxp-test',
        signingSecret: 'secret',
      }),
    );
  });

  it('should set the status and emoji correctly using the user token', async () => {
    const mockUser = { slackUserId: 'U1', slackUserToken: 'xoxp-user-token' } as unknown as User;
    await service.setStatus(mockUser, 'Test Status', ':headphones:');

    // To get the mocked App instance created in the service
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;

    expect(mockedAppInstance.client.users.profile.set).toHaveBeenCalledWith({
      token: 'xoxp-user-token',
      profile: JSON.stringify({
        status_text: 'Test Status',
        status_emoji: ':headphones:',
        status_expiration: 0,
      }),
    });
  });

  it('should clear the status correctly using the user token', async () => {
    const mockUser = { slackUserId: 'U1', slackUserToken: 'xoxp-user-token' } as unknown as User;
    await service.clearStatus(mockUser);

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;

    expect(mockedAppInstance.client.users.profile.set).toHaveBeenCalledWith({
      token: 'xoxp-user-token',
      profile: JSON.stringify({
        status_text: '',
        status_emoji: '',
        status_expiration: 0,
      }),
    });
  });
  it('should start the bolt app on the configured port', async () => {
    await service.start();

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    expect(mockedAppInstance.start).toHaveBeenCalledWith(3000);
  });

  it('should register command listener', () => {
    const mockListener = {
      commandName: '/testcommand',
      handle: jest.fn(),
    };

    service.registerCommandListener(mockListener);

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    expect(mockedAppInstance.command).toHaveBeenCalledWith('/testcommand', expect.any(Function));
  });
});
