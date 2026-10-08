import { AcronymMessageListenerService } from '../src/services/slack/event/acronym-message-listener.service';
import { IAcronymService } from '../src/services/acronym/types';
import { ISlackService, IEventContext } from '../src/services/slack/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('AcronymMessageListenerService', () => {
  let mockAcronymService: jest.Mocked<IAcronymService>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let listener: AcronymMessageListenerService;

  beforeEach(() => {
    mockAcronymService = {
      getAvailableCatalog: jest.fn(),
      getAvailableAcronyms: jest.fn(),
      generateGuess: jest.fn(),
      isGuessingActive: jest.fn().mockResolvedValue(true),
      setGuessingActive: jest.fn(),
      getMonitoredChannels: jest.fn().mockResolvedValue(['C123', 'C456']),
      isChannelMonitored: jest.fn().mockResolvedValue(true),
      addMonitoredChannels: jest.fn(),
      removeMonitoredChannels: jest.fn(),
      setMonitoredChannels: jest.fn(),
      getEnabledAcronyms: jest.fn().mockResolvedValue(['BTU', 'ASAP']),
      addEnabledAcronyms: jest.fn(),
      removeEnabledAcronyms: jest.fn(),
      setEnabledAcronyms: jest.fn(),
      getConfig: jest.fn(),
    };

    mockSlackService = {
      sendMessage: jest.fn().mockResolvedValue({ channel: 'C123', messageTimestamp: 'ts123' }),
      updateMessage: jest.fn(),
      setStatus: jest.fn(),
      clearStatus: jest.fn(),
      getRouter: jest.fn(),
      registerCommandListener: jest.fn(),
      registerViewListener: jest.fn(),
      registerEventListener: jest.fn(),
      openSettingsModal: jest.fn(),
      joinChannel: jest.fn().mockResolvedValue(true),
    };

    listener = new AcronymMessageListenerService(mockAcronymService);
  });

  it('should have the eventName set to message', () => {
    expect(listener.eventName).toBe('message');
  });

  it('should ignore messages from bots with bot_id', async () => {
    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'hello BTU',
        bot_id: 'B_BOT_123',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
    expect(mockAcronymService.generateGuess).not.toHaveBeenCalled();
  });

  it('should ignore messages with subtype bot_message', async () => {
    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'hello BTU',
        subtype: 'bot_message',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
  });

  it('should ignore messages when guessing behavior is inactive', async () => {
    mockAcronymService.isGuessingActive.mockResolvedValue(false);

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'hello BTU',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
  });

  it('should ignore messages sent in unmonitored channels', async () => {
    mockAcronymService.isChannelMonitored.mockResolvedValue(false);

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C_UNKNOWN',
        text: 'hello BTU',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAcronymService.isChannelMonitored).toHaveBeenCalledWith('C_UNKNOWN');
    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
  });

  it('should ignore messages without text', async () => {
    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
  });

  it('should detect an acronym and reply with random guess and custom botName', async () => {
    mockAcronymService.generateGuess.mockReturnValue({
      guess: 'Bumbling Tiger Uniforms?',
      botName: 'BTU Bot',
    });

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'something something, yada, yada, BTU yada something',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAcronymService.generateGuess).toHaveBeenCalledWith('BTU');
    expect(mockSlackService.sendMessage).toHaveBeenCalledWith('C123', 'Bumbling Tiger Uniforms?', {
      username: 'BTU Bot',
      threadTs: undefined,
    });
  });

  it('should detect acronym case-insensitively with word boundaries', async () => {
    mockAcronymService.generateGuess.mockReturnValue({
      guess: 'Bumbling Tiger Uniforms?',
      botName: 'BTU Bot',
    });

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'hey check this btu out!',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAcronymService.generateGuess).toHaveBeenCalledWith('BTU');
    expect(mockSlackService.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('should not trigger on partial words (e.g. OBTUSE should not match BTU)', async () => {
    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'That was an obtuse remark.',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAcronymService.generateGuess).not.toHaveBeenCalled();
    expect(mockSlackService.sendMessage).not.toHaveBeenCalled();
  });

  it('should reply in thread if the incoming message has thread_ts', async () => {
    mockAcronymService.generateGuess.mockReturnValue({
      guess: 'Bumbling Tiger Uniforms?',
      botName: 'BTU Bot',
    });

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'Check this BTU',
        thread_ts: '1234.5678',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockSlackService.sendMessage).toHaveBeenCalledWith('C123', 'Bumbling Tiger Uniforms?', {
      username: 'BTU Bot',
      threadTs: '1234.5678',
    });
  });

  it('should handle multiple distinct enabled acronyms in one message', async () => {
    mockAcronymService.generateGuess.mockImplementation((acronym) => {
      if (acronym === 'BTU') {
        return { guess: 'Bumbling Tiger Uniforms?', botName: 'BTU Bot' };
      }
      return { guess: 'Always Silly Penguins?', botName: 'ASAP Bot' };
    });

    const context: IEventContext = {
      body: {},
      event: {
        type: 'message',
        channel: 'C123',
        text: 'I need that BTU report ASAP please',
      } as any,
    };

    await listener.handle(context, mockSlackService);

    expect(mockAcronymService.generateGuess).toHaveBeenCalledWith('BTU');
    expect(mockAcronymService.generateGuess).toHaveBeenCalledWith('ASAP');
    expect(mockSlackService.sendMessage).toHaveBeenCalledTimes(2);
  });
});
