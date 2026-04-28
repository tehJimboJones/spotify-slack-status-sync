import { ReactionAddedListenerService } from '../src/services/slack/event/reaction-added-listener.service';
import { IUserService } from '../src/services/user/types';
import { ISessionRepository, EmojiConfigSession } from '../src/services/session/types';
import { ISlackService } from '../src/services/slack/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('ReactionAddedListenerService', () => {
  let mockUserService: jest.Mocked<IUserService>;
  let mockSessionRepository: jest.Mocked<ISessionRepository>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let listener: ReactionAddedListenerService;

  beforeEach(() => {
    mockUserService = {
      getUser: jest.fn(),
      getActiveUsers: jest.fn(),
      toggleUserSync: jest.fn(),
      upsertUser: jest.fn().mockResolvedValue(undefined),
    };

    mockSessionRepository = {
      createSession: jest.fn(),
      findActiveSessions: jest.fn(),
      findByMessageTs: jest.fn(),
      deleteSession: jest.fn().mockResolvedValue(undefined),
      deleteSessionsByMessageTs: jest.fn(),
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

    listener = new ReactionAddedListenerService(mockUserService, mockSessionRepository);
  });

  it('should have the correct event name', () => {
    expect(listener.eventName).toBe('reaction_added');
  });

  it('should process a valid reaction to a tracked configuration message', async () => {
    const mockContext: any = {
      body: {},
      event: {
        user: 'U123',
        item: {
          ts: '1234567890.123456',
        },
        reaction: 'headphones',
      },
    };

    const mockSession: EmojiConfigSession = {
      id: 1,
      userId: 'U123',
      channelId: 'C123',
      messageTs: '1234567890.123456',
      settingType: 'statusEmoji',
    };

    mockSessionRepository.findByMessageTs.mockResolvedValue(mockSession);

    await listener.handle(mockContext, mockSlackService);

    expect(mockSessionRepository.findByMessageTs).toHaveBeenCalledWith('1234567890.123456');
    expect(mockUserService.upsertUser).toHaveBeenCalledWith('U123', {
      statusEmoji: ':headphones:',
    });
    expect(mockSlackService.updateMessage).toHaveBeenCalledWith(
      'C123',
      '1234567890.123456',
      '✅ Your statusEmoji emoji has been updated to :headphones:!',
    );
    expect(mockSessionRepository.deleteSession).toHaveBeenCalledWith(1);
  });

  it('should handle standard +1 reactions correctly', async () => {
    const mockContext: any = {
      body: {},
      event: {
        user: 'U123',
        item: { ts: 'ts1' },
        reaction: '+1',
      },
    };

    const mockSession: EmojiConfigSession = {
      id: 1,
      userId: 'U123',
      channelId: 'C123',
      messageTs: 'ts1',
      settingType: 'pausedEmoji',
    };

    mockSessionRepository.findByMessageTs.mockResolvedValue(mockSession);

    await listener.handle(mockContext, mockSlackService);

    expect(mockUserService.upsertUser).toHaveBeenCalledWith('U123', {
      pausedEmoji: ':+1:',
    });
  });

  it('should ignore reactions to untracked messages', async () => {
    const mockContext: any = {
      body: {},
      event: {
        user: 'U123',
        item: {
          ts: 'untracked_ts',
        },
        reaction: 'smile',
      },
    };

    mockSessionRepository.findByMessageTs.mockResolvedValue(null);

    await listener.handle(mockContext, mockSlackService);

    expect(mockSessionRepository.findByMessageTs).toHaveBeenCalledWith('untracked_ts');
    expect(mockUserService.upsertUser).not.toHaveBeenCalled();
    expect(mockSlackService.updateMessage).not.toHaveBeenCalled();
    expect(mockSessionRepository.deleteSession).not.toHaveBeenCalled();
  });
});
