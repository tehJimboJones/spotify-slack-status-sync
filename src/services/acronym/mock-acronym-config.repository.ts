/**
 * Mock repository for acronym configuration testing.
 * @remarks
 * In-memory repository used for testing acronym configuration workflows without a database connection.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { AcronymConfig, IAcronymConfigRepository } from './types';

/**
 * In-memory mock implementation of IAcronymConfigRepository.
 *
 * @public
 */
export class MockAcronymConfigRepository implements IAcronymConfigRepository {
  private config: AcronymConfig;

  constructor(initialConfig?: Partial<AcronymConfig>) {
    this.config = {
      id: 1,
      isEnabled: initialConfig?.isEnabled ?? true,
      channels: initialConfig?.channels ? [...initialConfig.channels] : [],
      enabledAcronyms: initialConfig?.enabledAcronyms ? [...initialConfig.enabledAcronyms] : [],
    };
  }

  public async getConfig(): Promise<AcronymConfig> {
    return {
      ...this.config,
      channels: [...this.config.channels],
      enabledAcronyms: [...this.config.enabledAcronyms],
    };
  }

  public async updateConfig(updates: Partial<Omit<AcronymConfig, 'id'>>): Promise<AcronymConfig> {
    this.config = {
      ...this.config,
      ...updates,
      channels: updates.channels ? [...updates.channels] : this.config.channels,
      enabledAcronyms: updates.enabledAcronyms
        ? [...updates.enabledAcronyms]
        : this.config.enabledAcronyms,
    };
    return this.getConfig();
  }
}
