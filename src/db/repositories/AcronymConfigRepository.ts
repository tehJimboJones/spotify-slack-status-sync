/**
 * Sequelize-based repository for acronym feature configuration.
 * @remarks
 * Implements IAcronymConfigRepository using Sequelize ORM to persist acronym settings.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcronymConfig, IAcronymConfigRepository } from '../../services/acronym/types';
import { AcronymConfigModel } from '../models/AcronymConfig';

/**
 * Concrete implementation of IAcronymConfigRepository backed by Sequelize.
 *
 * @public
 */
export class SequelizeAcronymConfigRepository implements IAcronymConfigRepository {
  public async getConfig(): Promise<AcronymConfig> {
    let configRecord = await AcronymConfigModel.findOne();

    if (!configRecord) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configRecord = await AcronymConfigModel.create({
        isEnabled: true,
        channels: [],
        enabledAcronyms: [],
      } as any);
    }

    return this.mapToDomain(configRecord);
  }

  public async updateConfig(updates: Partial<Omit<AcronymConfig, 'id'>>): Promise<AcronymConfig> {
    let configRecord = await AcronymConfigModel.findOne();

    if (!configRecord) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configRecord = await AcronymConfigModel.create({
        isEnabled: updates.isEnabled ?? true,
        channels: updates.channels ?? [],
        enabledAcronyms: updates.enabledAcronyms ?? [],
      } as any);
    } else {
      if (updates.isEnabled !== undefined) {
        configRecord.isEnabled = updates.isEnabled;
      }
      if (updates.channels !== undefined) {
        configRecord.channels = updates.channels;
      }
      if (updates.enabledAcronyms !== undefined) {
        configRecord.enabledAcronyms = updates.enabledAcronyms;
      }
      await configRecord.save();
    }

    return this.mapToDomain(configRecord);
  }

  private mapToDomain(model: AcronymConfigModel): AcronymConfig {
    return {
      id: model.id,
      isEnabled: model.isEnabled,
      channels: Array.isArray(model.channels) ? [...model.channels] : [],
      enabledAcronyms: Array.isArray(model.enabledAcronyms) ? [...model.enabledAcronyms] : [],
    };
  }
}
