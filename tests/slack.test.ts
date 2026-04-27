import { SlackService } from '../src/slack';
import { AppConfig } from '../src/config';
import { App } from '@slack/bolt';
import { User, IUserService } from '../src/user';

// Mock the @slack/bolt module
jest.mock('@slack/bolt', () => {
  const mApp = {
    client: {
      users: {
        profile: {
          set: jest.fn().mockResolvedValue({ ok: true }),
        },
      },
      views: {
        open: jest.fn().mockResolvedValue({ ok: true }),
      },
    },
    start: jest.fn().mockResolvedValue(undefined),
    command: jest.fn(),
    view: jest.fn(),
  };
  return { App: jest.fn(() => mApp) };
});

describe('SlackService', () => {
  let mockConfig: AppConfig;
  let mockUserService: jest.Mocked<IUserService>;
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

    mockUserService = {
      getUser: jest.fn(),
      getActiveUsers: jest.fn(),
      toggleUserSync: jest.fn(),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };

    service = new SlackService(mockConfig, mockUserService);
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

  it('should open settings modal with podcast fields', async () => {
    const mockUser = {
      slackUserId: 'U1',
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: true,
      podcastStatusFormat: '{podcast}',
      podcastStatusEmoji: ':mic:',
      podcastPausedEmoji: ':pause:',
    } as unknown as User;

    await service.openSettingsModal('trigger-1', 'U1', mockUser);

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    expect(mockedAppInstance.client.views.open).toHaveBeenCalledWith(
      expect.objectContaining({
        trigger_id: 'trigger-1',
        view: expect.objectContaining({
          blocks: expect.arrayContaining([
            expect.objectContaining({ block_id: 'sync_podcasts_block' }),
            expect.objectContaining({ block_id: 'podcast_status_format_block' }),
            expect.objectContaining({ block_id: 'podcast_status_emoji_block' }),
            expect.objectContaining({ block_id: 'podcast_paused_emoji_block' }),
          ]),
        }),
      }),
    );
  });

  it('should parse view submission and pass podcast values to upsertUser', async () => {
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;

    // Simulate Bolt passing a view handler to the registered listener
    const viewCall = mockedAppInstance.view.mock.calls.find(
      (c: [string, (...args: unknown[]) => unknown]) => c[0] === 'settings_modal',
    );
    expect(viewCall).toBeDefined();

    const handler = viewCall[1];
    const mockAck = jest.fn();
    const mockBody = { user: { id: 'U1' } };
    const mockView = {
      state: {
        values: {
          status_format_block: { status_format: { value: '{song}' } },
          status_emoji_block: { status_emoji: { value: ':playing:' } },
          paused_emoji_block: { paused_emoji: { value: ':paused:' } },
          sync_podcasts_block: { sync_podcasts: { selected_options: [{ value: 'true' }] } },
          podcast_status_format_block: { podcast_status_format: { value: '{podcast}' } },
          podcast_status_emoji_block: { podcast_status_emoji: { value: ':mic:' } },
          podcast_paused_emoji_block: { podcast_paused_emoji: { value: ':stop:' } },
        },
      },
    };

    await handler({ ack: mockAck, body: mockBody, view: mockView });

    expect(mockAck).toHaveBeenCalled();
    expect(mockUserService.upsertUser).toHaveBeenCalledWith('U1', {
      statusFormat: '{song}',
      statusEmoji: ':playing:',
      pausedEmoji: ':paused:',
      syncPodcasts: true,
      podcastStatusFormat: '{podcast}',
      podcastStatusEmoji: ':mic:',
      podcastPausedEmoji: ':stop:',
    });
  });
});
