import { SlackService } from '../src/services/slack/slack.service';
import { IConfigService } from '../src/services/config/types';
import { App } from '@slack/bolt';
import { User } from '../src/services/user/types';
import {
  SlackMessageSendError,
  SlackMessageUpdateError,
  SlackStatusSetError,
  SlackStatusClearError,
  SlackSettingsModalError,
} from '../src/services/slack/errors';

// Mock the @slack/bolt module
jest.mock('@slack/bolt', () => {
  const mApp = {
    client: {
      chat: {
        postMessage: jest.fn().mockResolvedValue({ ok: true, channel: 'C1', ts: '123' }),
        update: jest.fn().mockResolvedValue({ ok: true }),
      },
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
  let mockConfig: IConfigService;
  let service: SlackService;

  beforeEach(() => {
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
        pausedEmoji: ':pause:',
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

  it('should register view listener', () => {
    const mockListener = {
      viewCallbackId: 'test_modal',
      handle: jest.fn(),
    };

    service.registerViewListener(mockListener);

    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    expect(mockedAppInstance.view).toHaveBeenCalledWith('test_modal', expect.any(Function));
  });

  it('should throw SlackStatusSetError when profile.set fails', async () => {
    const mockUser = { slackUserId: 'U1', slackUserToken: 'xoxp-user-token' } as unknown as User;
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    const error = new Error('Slack API Error');
    mockedAppInstance.client.users.profile.set.mockRejectedValueOnce(error);

    await expect(service.setStatus(mockUser, 'Test Status', ':invalid_emoji:')).rejects.toThrow(
      SlackStatusSetError,
    );
  });

  it('should throw SlackStatusClearError when clearing status fails', async () => {
    const mockUser = { slackUserId: 'U1', slackUserToken: 'xoxp-user-token' } as unknown as User;
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    const error = new Error('Slack API Error');
    mockedAppInstance.client.users.profile.set.mockRejectedValueOnce(error);

    await expect(service.clearStatus(mockUser)).rejects.toThrow(SlackStatusClearError);
  });

  it('should throw SlackMessageSendError when postMessage fails', async () => {
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    const error = new Error('API Error');
    mockedAppInstance.client.chat.postMessage.mockRejectedValueOnce(error);

    await expect(service.sendMessage('U1', 'Test')).rejects.toThrow(SlackMessageSendError);
  });

  it('should throw SlackMessageUpdateError when update fails', async () => {
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    const error = new Error('API Error');
    mockedAppInstance.client.chat.update.mockRejectedValueOnce(error);

    await expect(service.updateMessage('C1', '123', 'Updated')).rejects.toThrow(
      SlackMessageUpdateError,
    );
  });

  it('should throw SlackSettingsModalError when views.open fails', async () => {
    const mockUser = { slackUserId: 'U1' } as unknown as User;
    const mockedAppInstance = (App as unknown as jest.Mock).mock.results[0].value;
    const error = new Error('API Error');
    mockedAppInstance.client.views.open.mockRejectedValueOnce(error);

    await expect(service.openSettingsModal('trigger-1', 'U1', mockUser)).rejects.toThrow(
      SlackSettingsModalError,
    );
  });
});
