/**
 * Core acronym guessing and catalog management service.
 * @remarks
 * Handles loading of the acronym catalog, validation, random word selection per letter, and channel/acronym configuration.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import * as fs from 'fs';
import {
  AcronymCatalog,
  AcronymConfig,
  AcronymGuessResult,
  IAcronymConfigRepository,
  IAcronymService,
} from './types';
import { AcronymNotFoundError, InvalidAcronymCatalogError } from './errors';

/**
 * Concrete implementation of IAcronymService.
 *
 * @public
 */
export class AcronymService implements IAcronymService {
  private catalog: AcronymCatalog = {};

  constructor(
    private configRepository: IAcronymConfigRepository,
    catalogSource: string | AcronymCatalog,
  ) {
    this.catalog = this.loadAndValidateCatalog(catalogSource);
  }

  private loadAndValidateCatalog(source: string | AcronymCatalog): AcronymCatalog {
    let rawCatalog: unknown;

    if (typeof source === 'string') {
      try {
        if (!fs.existsSync(source)) {
          throw new InvalidAcronymCatalogError(`Catalog file not found: ${source}`);
        }
        const fileContent = fs.readFileSync(source, 'utf8');
        rawCatalog = JSON.parse(fileContent);
      } catch (error) {
        if (error instanceof InvalidAcronymCatalogError) {
          throw error;
        }
        throw new InvalidAcronymCatalogError(
          `Failed to parse catalog JSON from file: ${(error as Error).message}`,
        );
      }
    } else {
      rawCatalog = source;
    }

    if (!rawCatalog || typeof rawCatalog !== 'object' || Array.isArray(rawCatalog)) {
      throw new InvalidAcronymCatalogError('Acronym catalog must be a non-empty key-value object.');
    }

    const normalizedCatalog: AcronymCatalog = {};
    const entries = Object.entries(rawCatalog as Record<string, unknown>);

    if (entries.length === 0) {
      throw new InvalidAcronymCatalogError('Acronym catalog is empty.');
    }

    for (const [key, value] of entries) {
      const normalizedKey = key.trim().toUpperCase();

      if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new InvalidAcronymCatalogError(
          `Invalid acronym entry for ${key}: must be an object.`,
        );
      }

      const entryObj = value as { botName?: string; candidateWords?: Record<string, unknown> };

      if (
        !entryObj.candidateWords ||
        typeof entryObj.candidateWords !== 'object' ||
        Array.isArray(entryObj.candidateWords)
      ) {
        throw new InvalidAcronymCatalogError(
          `Acronym ${key} is missing a valid candidateWords mapping.`,
        );
      }

      // Validate that all letters in the acronym key exist in candidateWords with non-empty string arrays
      const normalizedCandidateWords: Record<string, string[]> = {};
      for (const [letterKey, wordsList] of Object.entries(entryObj.candidateWords)) {
        if (!Array.isArray(wordsList) || wordsList.length === 0) {
          throw new InvalidAcronymCatalogError(
            `Candidate words for letter ${letterKey} in acronym ${key} must be a non-empty array.`,
          );
        }
        normalizedCandidateWords[letterKey.toUpperCase()] = wordsList.map((w) => String(w));
      }

      // Check each letter of the acronym
      for (const char of normalizedKey) {
        if (!normalizedCandidateWords[char] || normalizedCandidateWords[char].length === 0) {
          throw new InvalidAcronymCatalogError(
            `Acronym ${key} is missing candidate words for required letter "${char}".`,
          );
        }
      }

      normalizedCatalog[normalizedKey] = {
        botName: entryObj.botName ? String(entryObj.botName) : undefined,
        candidateWords: normalizedCandidateWords,
      };
    }

    return normalizedCatalog;
  }

  public getAvailableCatalog(): AcronymCatalog {
    return { ...this.catalog };
  }

  public getAvailableAcronyms(): string[] {
    return Object.keys(this.catalog);
  }

  public generateGuess(acronym: string): AcronymGuessResult {
    const normalizedKey = acronym.trim().toUpperCase();
    const entry = this.catalog[normalizedKey];

    if (!entry) {
      throw new AcronymNotFoundError(`Acronym "${acronym}" not found in catalog.`);
    }

    const selectedWords: string[] = [];

    for (const char of normalizedKey) {
      const words = entry.candidateWords[char];
      if (!words || words.length === 0) {
        throw new InvalidAcronymCatalogError(
          `No candidate words found for letter "${char}" in acronym "${acronym}".`,
        );
      }
      const randomIndex = Math.floor(Math.random() * words.length);
      selectedWords.push(words[randomIndex]);
    }

    const guess = `${selectedWords.join(' ')}?`;

    return {
      guess,
      botName: entry.botName,
    };
  }

  public async isGuessingActive(): Promise<boolean> {
    const config = await this.configRepository.getConfig();
    return config.isEnabled;
  }

  public async setGuessingActive(active: boolean): Promise<void> {
    await this.configRepository.updateConfig({ isEnabled: active });
  }

  public async getMonitoredChannels(): Promise<string[]> {
    const config = await this.configRepository.getConfig();
    return [...config.channels];
  }

  public async isChannelMonitored(channelId: string): Promise<boolean> {
    const channels = await this.getMonitoredChannels();
    return channels.includes(channelId);
  }

  public async addMonitoredChannels(channels: string[]): Promise<string[]> {
    const current = await this.getMonitoredChannels();
    const updated = Array.from(new Set([...current, ...channels.map((c) => c.trim())]));
    const saved = await this.configRepository.updateConfig({ channels: updated });
    return saved.channels;
  }

  public async removeMonitoredChannels(channels: string[]): Promise<string[]> {
    const current = await this.getMonitoredChannels();
    const toRemove = new Set(channels.map((c) => c.trim()));
    const updated = current.filter((c) => !toRemove.has(c));
    const saved = await this.configRepository.updateConfig({ channels: updated });
    return saved.channels;
  }

  public async setMonitoredChannels(channels: string[]): Promise<string[]> {
    const updated = Array.from(new Set(channels.map((c) => c.trim())));
    const saved = await this.configRepository.updateConfig({ channels: updated });
    return saved.channels;
  }

  public async getEnabledAcronyms(): Promise<string[]> {
    const config = await this.configRepository.getConfig();
    return [...config.enabledAcronyms];
  }

  public async addEnabledAcronyms(acronyms: string[]): Promise<string[]> {
    const current = await this.getEnabledAcronyms();
    const normalizedToAdd: string[] = [];

    for (const a of acronyms) {
      const norm = a.trim().toUpperCase();
      if (!this.catalog[norm]) {
        throw new AcronymNotFoundError(`Acronym "${a}" is not in the catalog.`);
      }
      normalizedToAdd.push(norm);
    }

    const updated = Array.from(new Set([...current, ...normalizedToAdd]));
    const saved = await this.configRepository.updateConfig({ enabledAcronyms: updated });
    return saved.enabledAcronyms;
  }

  public async removeEnabledAcronyms(acronyms: string[]): Promise<string[]> {
    const current = await this.getEnabledAcronyms();
    const toRemove = new Set(acronyms.map((a) => a.trim().toUpperCase()));
    const updated = current.filter((a) => !toRemove.has(a));
    const saved = await this.configRepository.updateConfig({ enabledAcronyms: updated });
    return saved.enabledAcronyms;
  }

  public async setEnabledAcronyms(acronyms: string[]): Promise<string[]> {
    const normalized: string[] = [];

    for (const a of acronyms) {
      const norm = a.trim().toUpperCase();
      if (!this.catalog[norm]) {
        throw new AcronymNotFoundError(`Acronym "${a}" is not in the catalog.`);
      }
      normalized.push(norm);
    }

    const updated = Array.from(new Set(normalized));
    const saved = await this.configRepository.updateConfig({ enabledAcronyms: updated });
    return saved.enabledAcronyms;
  }

  public async getConfig(): Promise<AcronymConfig> {
    return this.configRepository.getConfig();
  }
}
