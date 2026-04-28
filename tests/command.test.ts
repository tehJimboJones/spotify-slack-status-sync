import { CommandListenerService } from '../src/services/slack/command/command-listener.service';
import { IUserService } from '../src/services/user/types';
import { UserNotFoundError } from '../src/services/user/errors';
import { ISlackService } from '../src/services/slack/types';
import { IConfigService } from '../src/services/config/types';
import { ISessionRepository } from '../src/services/session/types';

describe('CommandListenerService', () => {
  let mockUserService: jest.Mocked<IUserService>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let mockConfig: IConfigService;
  let mockSessionRepository: jest.Mocked<ISessionRepository>;
  let commandListener: CommandListenerService;

  beforeEach(() => {
    mockUserService = {
      getUser: jest.fn().mockResolvedValue(null),
      getActiveUsers: jest.fn().mockResolvedValue([]),
      toggleUserSync: jest.fn().mockResolvedValue(undefined),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };
    mockSlackService = {
      sendMessage: jest.fn().mockResolvedValue({ channel: 'C123', messageTimestamp: 'new_ts' }),
      updateMessage: jest.fn().mockResolvedValue(undefined),
      setStatus: jest.fn().mockResolvedValue(undefined),
      clearStatus: jest.fn().mockResolvedValue(undefined),
      start: jest.fn().mockResolvedValue(undefined),
      registerCommandListener: jest.fn(),
      registerViewListener: jest.fn(),
      registerEventListener: jest.fn(),
      openSettingsModal: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ISlackService>;
    mockConfig = {
      getBotConfig: () => ({ baseUrl: 'http://localhost:3000' }),
    } as unknown as IConfigService;

    mockSessionRepository = {
      createSession: jest.fn().mockResolvedValue({}),
      findActiveSessions: jest.fn().mockResolvedValue([]),
      findByMessageTs: jest.fn(),
      deleteSession: jest.fn().mockResolvedValue(undefined),
      deleteSessionsByMessageTs: jest.fn(),
    };

    commandListener = new CommandListenerService(
      mockUserService,
      mockConfig,
      mockSessionRepository,
    );
  });

  it('should have the correct command name', () => {
    expect(commandListener.commandName).toBe('/spotifystatus');
  });

  it('should toggle user sync to true when the start command is received', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: 'start',
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockUserService.toggleUserSync).toHaveBeenCalledTimes(1);
    expect(mockUserService.toggleUserSync).toHaveBeenCalledWith('U123', true);
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('started'));
  });

  it('should toggle user sync to false when the stop command is received', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: ' stop ', // Testing trimming
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockUserService.toggleUserSync).toHaveBeenCalledTimes(1);
    expect(mockUserService.toggleUserSync).toHaveBeenCalledWith('U123', false);
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('stopped'));
  });

  it('should respond with an error for unknown commands', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: 'invalid_command',
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockUserService.toggleUserSync).not.toHaveBeenCalled();
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
  });

  it('should respond with a login link if UserNotFoundError is thrown on start', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);
    mockUserService.toggleUserSync.mockRejectedValue(new UserNotFoundError('Not found'));

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: 'start',
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockRespond).toHaveBeenCalledWith(
      expect.stringContaining('Please link your Slack and Spotify accounts'),
    );
  });

  it('should respond with a login link if UserNotFoundError is thrown on settings', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);
    mockUserService.getUser.mockRejectedValue(new UserNotFoundError('Not found'));

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: 'settings',
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockRespond).toHaveBeenCalledWith(
      expect.stringContaining('Please link your Slack and Spotify accounts'),
    );
  });

  it('should clean up old sessions and create new ones when the emojis command is received', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);
    const existingSessions = [
      {
        id: 1,
        userId: 'U123',
        channelId: 'C123',
        messageTs: 'old_ts1',
        settingType: 'statusEmoji',
      },
    ];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockSessionRepository.findActiveSessions.mockResolvedValue(existingSessions as any);

    await commandListener.handle(
      {
        userId: 'U123',
        triggerId: 'T123',
        text: 'emojis',
        respond: mockRespond,
      },
      mockSlackService,
    );

    expect(mockSessionRepository.findActiveSessions).toHaveBeenCalledWith('U123');
    expect(mockSlackService.updateMessage).toHaveBeenCalledWith(
      'C123',
      'old_ts1',
      expect.stringContaining('(This configuration message has expired)'),
    );
    expect(mockSessionRepository.deleteSession).toHaveBeenCalledWith(1);

    expect(mockSlackService.sendMessage).toHaveBeenCalledTimes(4);
    expect(mockSessionRepository.createSession).toHaveBeenCalledTimes(4);
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Sent you a direct message'));
  });
});
