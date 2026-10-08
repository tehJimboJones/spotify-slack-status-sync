import { AcronymCommandListenerService } from '../src/services/slack/command/acronym-command-listener.service';
import { IAcronymService } from '../src/services/acronym/types';
import { ISlackService } from '../src/services/slack/types';
import { ICommandContext } from '../src/services/slack/command/types';
import { AcronymNotFoundError } from '../src/services/acronym/errors';

describe('AcronymCommandListenerService', () => {
  let mockAcronymService: jest.Mocked<IAcronymService>;
  let mockSlackService: jest.Mocked<ISlackService>;
  let commandListener: AcronymCommandListenerService;

  beforeEach(() => {
    mockAcronymService = {
      getAvailableCatalog: jest.fn().mockReturnValue({
        BTU: { botName: 'BTU Bot', candidateWords: { B: ['B'], T: ['T'], U: ['U'] } },
        ASAP: { botName: 'ASAP Bot', candidateWords: { A: ['A'], S: ['S'], P: ['P'] } },
      }),
      getAvailableAcronyms: jest.fn().mockReturnValue(['BTU', 'ASAP']),
      generateGuess: jest.fn(),
      isGuessingActive: jest.fn().mockResolvedValue(true),
      setGuessingActive: jest.fn().mockResolvedValue(undefined),
      getMonitoredChannels: jest.fn().mockResolvedValue(['C123']),
      isChannelMonitored: jest.fn().mockResolvedValue(true),
      addMonitoredChannels: jest.fn().mockResolvedValue(['C123', 'C456']),
      removeMonitoredChannels: jest.fn().mockResolvedValue([]),
      setMonitoredChannels: jest.fn().mockResolvedValue(['C456']),
      getEnabledAcronyms: jest.fn().mockResolvedValue(['BTU']),
      addEnabledAcronyms: jest.fn().mockResolvedValue(['BTU', 'ASAP']),
      removeEnabledAcronyms: jest.fn().mockResolvedValue([]),
      setEnabledAcronyms: jest.fn().mockResolvedValue(['ASAP']),
      getConfig: jest.fn().mockResolvedValue({
        id: 1,
        isEnabled: true,
        channels: ['C123'],
        enabledAcronyms: ['BTU'],
      }),
    };

    mockSlackService = {
      sendMessage: jest.fn(),
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

    commandListener = new AcronymCommandListenerService(mockAcronymService);
  });

  it('should have commandName set to /acronym', () => {
    expect(commandListener.commandName).toBe('/acronym');
  });

  describe('start & stop', () => {
    it('should start guessing behavior on start command', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'start',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.setGuessingActive).toHaveBeenCalledWith(true);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('started'));
    });

    it('should stop guessing behavior on stop command', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'stop',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.setGuessingActive).toHaveBeenCalledWith(false);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('stopped'));
    });
  });

  describe('status command', () => {
    it('should display status summary', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'status',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Active'));
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('C123'));
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('BTU'));
    });
  });

  describe('config channels', () => {
    it('should list channels', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config channels list',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.getMonitoredChannels).toHaveBeenCalled();
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('C123'));
    });

    it('should add channels and sanitize Slack channel formatting (<#C456|general>)', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config channels add <#C456|general>',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.addMonitoredChannels).toHaveBeenCalledWith(['C456']);
      expect(mockSlackService.joinChannel).toHaveBeenCalledWith('C456');
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Added'));
    });

    it('should remove channels', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config channels remove C123',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.removeMonitoredChannels).toHaveBeenCalledWith(['C123']);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Removed'));
    });

    it('should set channels', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config channels set C456',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.setMonitoredChannels).toHaveBeenCalledWith(['C456']);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Updated'));
    });
  });

  describe('config acronyms', () => {
    it('should list enabled and available acronyms', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config acronyms list',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.getEnabledAcronyms).toHaveBeenCalled();
      expect(mockAcronymService.getAvailableAcronyms).toHaveBeenCalled();
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('BTU'));
    });

    it('should add acronyms to enabled list', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config acronyms add ASAP',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.addEnabledAcronyms).toHaveBeenCalledWith(['ASAP']);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Added'));
    });

    it('should handle AcronymNotFoundError when adding unknown acronym', async () => {
      mockAcronymService.addEnabledAcronyms.mockRejectedValueOnce(
        new AcronymNotFoundError('Acronym FOO not found in catalog'),
      );

      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config acronyms add FOO',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('not found'));
    });

    it('should remove acronyms from enabled list', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config acronyms remove BTU',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.removeEnabledAcronyms).toHaveBeenCalledWith(['BTU']);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Removed'));
    });

    it('should set enabled acronyms directly', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'config acronyms set ASAP',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockAcronymService.setEnabledAcronyms).toHaveBeenCalledWith(['ASAP']);
      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('Updated'));
    });
  });

  describe('help & unknown commands', () => {
    it('should respond with usage instructions when empty or help is called', async () => {
      const mockRespond = jest.fn().mockResolvedValue(undefined);
      const context: ICommandContext = {
        userId: 'U1',
        triggerId: 'T1',
        text: 'help',
        respond: mockRespond,
      };

      await commandListener.handle(context, mockSlackService);

      expect(mockRespond).toHaveBeenCalledWith(expect.stringContaining('/acronym'));
    });
  });
});
