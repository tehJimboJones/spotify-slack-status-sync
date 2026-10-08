/**
 * Type definitions for the Acronym Guesser service.
 * @remarks
 * Defines contracts, domain models, and configurations for acronym cataloging, guessing, and channel listening.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */

/**
 * Definition of a single acronym entry in the catalog.
 *
 * @public
 */
export interface AcronymDefinition {
  /** Optional custom bot name to post with when replying for this acronym */
  botName?: string;
  /** Map of each letter in the acronym to candidate words */
  candidateWords: Record<string, string[]>;
}

/**
 * Top-level catalog structure mapping acronym keys to their definitions.
 *
 * @public
 */
export type AcronymCatalog = Record<string, AcronymDefinition>;

/**
 * Result of generating a random guess for an acronym.
 *
 * @public
 */
export interface AcronymGuessResult {
  /** The generated guess sentence ending with a question mark */
  guess: string;
  /** The bot name to use for replying, if configured */
  botName?: string;
}

/**
 * Runtime configuration state for the acronym guessing feature.
 *
 * @public
 */
export interface AcronymConfig {
  /** Database record identifier */
  id?: number;
  /** Whether guessing behavior is currently active */
  isEnabled: boolean;
  /** List of Slack channel IDs where the bot listens */
  channels: string[];
  /** List of acronyms actively enabled for listening */
  enabledAcronyms: string[];
}

/**
 * Repository contract for persisting acronym feature configuration.
 *
 * @public
 */
export interface IAcronymConfigRepository {
  /** Retrieves the current configuration */
  getConfig(): Promise<AcronymConfig>;
  /** Updates the configuration partially and returns the updated state */
  updateConfig(updates: Partial<Omit<AcronymConfig, 'id'>>): Promise<AcronymConfig>;
}

/**
 * Core service contract for managing acronyms, guessing, and channel monitoring.
 *
 * @public
 */
export interface IAcronymService {
  /** Returns the full loaded catalog */
  getAvailableCatalog(): AcronymCatalog;
  /** Returns the list of all available acronym keys from the catalog */
  getAvailableAcronyms(): string[];
  /** Generates a random guess for a given acronym */
  generateGuess(acronym: string): AcronymGuessResult;
  /** Checks if the guessing behavior is currently active */
  isGuessingActive(): Promise<boolean>;
  /** Activates or deactivates guessing behavior */
  setGuessingActive(active: boolean): Promise<void>;
  /** Retrieves the list of currently monitored channels */
  getMonitoredChannels(): Promise<string[]>;
  /** Checks if a specific channel is being monitored */
  isChannelMonitored(channelId: string): Promise<boolean>;
  /** Adds channels to the monitored list */
  addMonitoredChannels(channels: string[]): Promise<string[]>;
  /** Removes channels from the monitored list */
  removeMonitoredChannels(channels: string[]): Promise<string[]>;
  /** Replaces the monitored channels list */
  setMonitoredChannels(channels: string[]): Promise<string[]>;
  /** Retrieves the list of currently enabled acronyms */
  getEnabledAcronyms(): Promise<string[]>;
  /** Enables additional acronyms to listen for */
  addEnabledAcronyms(acronyms: string[]): Promise<string[]>;
  /** Disables acronyms from listening */
  removeEnabledAcronyms(acronyms: string[]): Promise<string[]>;
  /** Replaces the enabled acronyms list */
  setEnabledAcronyms(acronyms: string[]): Promise<string[]>;
  /** Gets the full configuration state */
  getConfig(): Promise<AcronymConfig>;
}
