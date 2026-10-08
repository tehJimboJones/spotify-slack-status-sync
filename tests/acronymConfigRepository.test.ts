import { Sequelize } from 'sequelize-typescript';
import { AcronymConfigModel } from '../src/db/models/AcronymConfig';
import { SequelizeAcronymConfigRepository } from '../src/db/repositories/AcronymConfigRepository';
import { MockAcronymConfigRepository } from '../src/services/acronym/mock-acronym-config.repository';

describe('AcronymConfigRepository', () => {
  describe('MockAcronymConfigRepository', () => {
    let mockRepo: MockAcronymConfigRepository;

    beforeEach(() => {
      mockRepo = new MockAcronymConfigRepository({
        isEnabled: false,
        channels: ['C_INITIAL'],
        enabledAcronyms: ['BTU'],
      });
    });

    it('should return initial configuration on getConfig', async () => {
      const config = await mockRepo.getConfig();
      expect(config.isEnabled).toBe(false);
      expect(config.channels).toEqual(['C_INITIAL']);
      expect(config.enabledAcronyms).toEqual(['BTU']);
    });

    it('should update configuration fields partially', async () => {
      await mockRepo.updateConfig({ isEnabled: true });
      const updated = await mockRepo.getConfig();
      expect(updated.isEnabled).toBe(true);
      expect(updated.channels).toEqual(['C_INITIAL']);

      await mockRepo.updateConfig({ channels: ['C_NEW1', 'C_NEW2'] });
      const updatedChannels = await mockRepo.getConfig();
      expect(updatedChannels.channels).toEqual(['C_NEW1', 'C_NEW2']);
    });
  });

  describe('SequelizeAcronymConfigRepository (SQLite in-memory)', () => {
    let sequelize: Sequelize;
    let repo: SequelizeAcronymConfigRepository;

    beforeAll(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        models: [AcronymConfigModel],
      });

      await sequelize.sync({ force: true });
      repo = new SequelizeAcronymConfigRepository();
    });

    afterAll(async () => {
      await sequelize.close();
    });

    afterEach(async () => {
      await AcronymConfigModel.destroy({ where: {}, truncate: true });
    });

    it('should return default config if no row exists in table', async () => {
      const config = await repo.getConfig();
      expect(config.isEnabled).toBe(true);
      expect(config.channels).toEqual([]);
      expect(config.enabledAcronyms).toEqual([]);
    });

    it('should update config and persist across subsequent calls', async () => {
      await repo.updateConfig({
        isEnabled: false,
        channels: ['C123', 'C456'],
        enabledAcronyms: ['BTU'],
      });

      const config = await repo.getConfig();
      expect(config.isEnabled).toBe(false);
      expect(config.channels).toEqual(['C123', 'C456']);
      expect(config.enabledAcronyms).toEqual(['BTU']);
    });

    it('should allow partial updates to existing row', async () => {
      await repo.updateConfig({
        isEnabled: true,
        channels: ['C123'],
        enabledAcronyms: ['BTU', 'ASAP'],
      });

      await repo.updateConfig({
        channels: ['C999'],
      });

      const config = await repo.getConfig();
      expect(config.isEnabled).toBe(true);
      expect(config.channels).toEqual(['C999']);
      expect(config.enabledAcronyms).toEqual(['BTU', 'ASAP']);
    });
  });
});
