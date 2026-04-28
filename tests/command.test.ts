import { CommandListenerService } from '../src/services/slack/command/command-listener.service';
import { IUserService } from '../src/services/user/types';
import { UserNotFoundError } from '../src/services/user/errors';
import { ISlackService } from '../src/services/slack/types';
import { IConfigService } from '../src/services/config/types';

describe('CommandListenerService', () => {
  let mockUserService: jest.Mocked<IUserService>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let mockConfig: IConfigService;
  let commandListener: CommandListenerService;

  beforeEach(() => {
    mockUserService = {
      getUser: jest.fn().mockResolvedValue(null),
      getActiveUsers: jest.fn().mockResolvedValue([]),
      toggleUserSync: jest.fn().mockResolvedValue(undefined),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };
    mockSlackService = {
      setStatus: jest.fn().mockResolvedValue(undefined),
      clearStatus: jest.fn().mockResolvedValue(undefined),
      start: jest.fn().mockResolvedValue(undefined),
      registerCommandListener: jest.fn(),
      registerViewListener: jest.fn(),
      openSettingsModal: jest.fn().mockResolvedValue(undefined),
    };
    mockConfig = {
      getBotConfig: () => ({ baseUrl: 'http://localhost:3000' }),
    } as unknown as IConfigService;

    commandListener = new CommandListenerService(mockUserService, mockSlackService, mockConfig);
  });

  it('should have the correct command name', () => {
    expect(commandListener.commandName).toBe('/spotifystatus');
  });

  it('should toggle user sync to true when the start command is received', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle({
      userId: 'U123',
      triggerId: 'T123',
      text: 'start',
      respond: mockRespond,
    });

    expect(mockUserService.toggleUserSync).toHaveBeenCalledTimes(1);
    expect(mockUserService.toggleUserSync).toHaveBeenCalledWith('U123', true);
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('started'));
  });

  it('should toggle user sync to false when the stop command is received', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle({
      userId: 'U123',
      triggerId: 'T123',
      text: ' stop ', // Testing trimming
      respond: mockRespond,
    });

    expect(mockUserService.toggleUserSync).toHaveBeenCalledTimes(1);
    expect(mockUserService.toggleUserSync).toHaveBeenCalledWith('U123', false);
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('stopped'));
  });

  it('should respond with an error for unknown commands', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);

    await commandListener.handle({
      userId: 'U123',
      triggerId: 'T123',
      text: 'invalid_command',
      respond: mockRespond,
    });

    expect(mockUserService.toggleUserSync).not.toHaveBeenCalled();
    expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
  });

  it('should respond with a login link if UserNotFoundError is thrown on start', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);
    mockUserService.toggleUserSync.mockRejectedValue(new UserNotFoundError('Not found'));

    await commandListener.handle({
      userId: 'U123',
      triggerId: 'T123',
      text: 'start',
      respond: mockRespond,
    });

    expect(mockRespond).toHaveBeenCalledWith(
      expect.stringContaining('Please link your Slack and Spotify accounts'),
    );
  });

  it('should respond with a login link if UserNotFoundError is thrown on settings', async () => {
    const mockRespond = jest.fn().mockResolvedValue(undefined);
    mockUserService.getUser.mockRejectedValue(new UserNotFoundError('Not found'));

    await commandListener.handle({
      userId: 'U123',
      triggerId: 'T123',
      text: 'settings',
      respond: mockRespond,
    });

    expect(mockRespond).toHaveBeenCalledWith(
      expect.stringContaining('Please link your Slack and Spotify accounts'),
    );
  });
});
