import { AcronymService } from '../src/services/acronym/acronym.service';
import { IAcronymConfigRepository, AcronymCatalog } from '../src/services/acronym/types';
import { AcronymNotFoundError, InvalidAcronymCatalogError } from '../src/services/acronym/errors';
import * as fs from 'fs';
import * as path from 'path';

describe('AcronymService', () => {
  let mockRepo: jest.Mocked<IAcronymConfigRepository>;
  let sampleCatalog: AcronymCatalog;

  beforeEach(() => {
    sampleCatalog = {
      BTU: {
        botName: 'BTU Bot',
        candidateWords: {
          B: ['Bumbling', 'Brave', 'Bizarre'],
          T: ['Tiger', 'Tasty', 'Timid'],
          U: ['Uniforms', 'Umbrellas', 'Unicorns'],
        },
      },
      ASAP: {
        botName: 'ASAP Bot',
        candidateWords: {
          A: ['Always', 'Awkward'],
          S: ['Silly', 'Silent'],
          P: ['Penguins', 'Pickles'],
        },
      },
    };

    mockRepo = {
      getConfig: jest.fn().mockResolvedValue({
        id: 1,
        isEnabled: true,
        channels: ['C123', 'C456'],
        enabledAcronyms: ['BTU', 'ASAP'],
      }),
      updateConfig: jest.fn().mockImplementation(async (updates) => ({
        id: 1,
        isEnabled: updates.isEnabled ?? true,
        channels: updates.channels ?? ['C123', 'C456'],
        enabledAcronyms: updates.enabledAcronyms ?? ['BTU', 'ASAP'],
      })),
    };
  });

  describe('Catalog Loading & Validation', () => {
    it('should initialize with an in-memory catalog object', () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      const catalog = service.getAvailableCatalog();
      expect(catalog).toEqual(sampleCatalog);
      expect(service.getAvailableAcronyms()).toEqual(['BTU', 'ASAP']);
    });

    it('should load catalog from a JSON file path', () => {
      const tempFilePath = path.join(__dirname, 'temp_acronyms_test.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(sampleCatalog));

      try {
        const service = new AcronymService(mockRepo, tempFilePath);
        expect(service.getAvailableAcronyms()).toEqual(['BTU', 'ASAP']);
      } finally {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    });

    it('should throw InvalidAcronymCatalogError if file does not exist', () => {
      expect(() => new AcronymService(mockRepo, '/non/existent/path/acronyms.json')).toThrow(
        InvalidAcronymCatalogError,
      );
    });

    it('should throw InvalidAcronymCatalogError if catalog is not a valid object or empty', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => new AcronymService(mockRepo, null as any)).toThrow(InvalidAcronymCatalogError);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => new AcronymService(mockRepo, [] as any)).toThrow(InvalidAcronymCatalogError);
    });

    it('should throw InvalidAcronymCatalogError if an acronym has missing letters in candidateWords', () => {
      const invalidCatalog: AcronymCatalog = {
        BTU: {
          botName: 'BTU Bot',
          candidateWords: {
            B: ['Bumbling'],
            T: ['Tiger'],
            // Missing 'U'
          },
        },
      };

      expect(() => new AcronymService(mockRepo, invalidCatalog)).toThrow(
        InvalidAcronymCatalogError,
      );
    });

    it('should throw InvalidAcronymCatalogError if candidate word array for a letter is empty', () => {
      const invalidCatalog: AcronymCatalog = {
        BTU: {
          botName: 'BTU Bot',
          candidateWords: {
            B: ['Bumbling'],
            T: [],
            U: ['Uniforms'],
          },
        },
      };

      expect(() => new AcronymService(mockRepo, invalidCatalog)).toThrow(
        InvalidAcronymCatalogError,
      );
    });
  });

  describe('Random Guess Generation', () => {
    it('should generate a guess formatted with a trailing question mark', () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      const result = service.generateGuess('BTU');

      expect(result.botName).toBe('BTU Bot');
      expect(result.guess.endsWith('?')).toBe(true);

      const words = result.guess.slice(0, -1).split(' ');
      expect(words).toHaveLength(3);
      expect(sampleCatalog.BTU.candidateWords.B).toContain(words[0]);
      expect(sampleCatalog.BTU.candidateWords.T).toContain(words[1]);
      expect(sampleCatalog.BTU.candidateWords.U).toContain(words[2]);
    });

    it('should handle case insensitivity when querying an acronym', () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      const result = service.generateGuess('btu');

      expect(result.botName).toBe('BTU Bot');
      expect(result.guess.endsWith('?')).toBe(true);
    });

    it('should handle repeated letters in an acronym (e.g. ASAP has two A letters)', () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      const result = service.generateGuess('ASAP');

      const words = result.guess.slice(0, -1).split(' ');
      expect(words).toHaveLength(4);
      expect(sampleCatalog.ASAP.candidateWords.A).toContain(words[0]);
      expect(sampleCatalog.ASAP.candidateWords.S).toContain(words[1]);
      expect(sampleCatalog.ASAP.candidateWords.A).toContain(words[2]);
      expect(sampleCatalog.ASAP.candidateWords.P).toContain(words[3]);
    });

    it('should throw AcronymNotFoundError if acronym is not in catalog', () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      expect(() => service.generateGuess('UNKNOWN')).toThrow(AcronymNotFoundError);
    });
  });

  describe('Configuration & State Management', () => {
    it('should check if guessing is active', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      const isActive = await service.isGuessingActive();
      expect(isActive).toBe(true);
    });

    it('should toggle guessing active state (start / stop)', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);

      await service.setGuessingActive(false);
      expect(mockRepo.updateConfig).toHaveBeenCalledWith({ isEnabled: false });

      await service.setGuessingActive(true);
      expect(mockRepo.updateConfig).toHaveBeenCalledWith({ isEnabled: true });
    });

    it('should check if a channel is monitored', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);

      expect(await service.isChannelMonitored('C123')).toBe(true);
      expect(await service.isChannelMonitored('C999')).toBe(false);
    });

    it('should add monitored channels without duplicates', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.addMonitoredChannels(['C456', 'C789']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        channels: ['C123', 'C456', 'C789'],
      });
    });

    it('should remove monitored channels', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.removeMonitoredChannels(['C123']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        channels: ['C456'],
      });
    });

    it('should set monitored channels directly', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.setMonitoredChannels(['C999']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        channels: ['C999'],
      });
    });

    it('should add enabled acronyms only if they exist in catalog', async () => {
      mockRepo.getConfig.mockResolvedValueOnce({
        id: 1,
        isEnabled: true,
        channels: ['C123'],
        enabledAcronyms: ['BTU'],
      });

      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.addEnabledAcronyms(['ASAP']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        enabledAcronyms: ['BTU', 'ASAP'],
      });
    });

    it('should reject adding acronyms that do not exist in catalog', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);

      await expect(service.addEnabledAcronyms(['NONEXISTENT'])).rejects.toThrow(
        AcronymNotFoundError,
      );
    });

    it('should remove enabled acronyms', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.removeEnabledAcronyms(['BTU']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        enabledAcronyms: ['ASAP'],
      });
    });

    it('should set enabled acronyms after validating all exist in catalog', async () => {
      const service = new AcronymService(mockRepo, sampleCatalog);
      await service.setEnabledAcronyms(['BTU']);

      expect(mockRepo.updateConfig).toHaveBeenCalledWith({
        enabledAcronyms: ['BTU'],
      });
    });
  });
});
