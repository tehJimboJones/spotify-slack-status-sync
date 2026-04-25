import { SlackService } from '../src/slack';
import { AppConfig } from '../src/config';
import { App } from '@slack/bolt';

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
        userToken: 'xoxp-test',
        signingSecret: 'secret',
      },
      bot: {
        pollIntervalMs: 60000,
        statusEmoji: ':headphones:',
        pausedEmoji: ':double_vertical_bar:',
        statusFormat: '{song} - {artist}',
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

  it('should set the status and emoji correctly', async () => {
    await service.setStatus('Test Status', ':headphones:');

    // To get the mocked App instance created in the service
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;

    expect(mockedAppInstance.client.users.profile.set).toHaveBeenCalledWith({
      profile: JSON.stringify({
        status_text: 'Test Status',
        status_emoji: ':headphones:',
        status_expiration: 0,
      }),
    });
  });

  it('should clear the status', async () => {
    await service.clearStatus();

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;

    expect(mockedAppInstance.client.users.profile.set).toHaveBeenCalledWith({
      profile: JSON.stringify({
        status_text: '',
        status_emoji: '',
        status_expiration: 0,
      }),
    });
  });
});
