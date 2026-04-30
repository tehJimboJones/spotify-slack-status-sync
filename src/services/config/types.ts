/**
 * Type definitions for the configuration service.
 * @remarks
 * Contains interfaces describing the shape of the application's configuration state, including Slack, Spotify, and database settings.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Represents the structured application configuration.
 */
/**
 * Structure of the unified application configuration.
 *
 * @remarks
 * Defines the strongly-typed schema for all environmental and runtime configuration parameters required by the application.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * AppConfig([AppConfig])
 * IConfigService[IConfigService] -.->|Returns| AppConfig
 * ```
 *
 * @example
 * ```typescript
 * const cfg: AppConfig = { port: 3000, slack: { ... } };
 * ```
 *
 * @public
 */
export interface AppConfig {
  /** Spotify API configuration credentials */
  spotify: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    refreshToken: string;
  };
  /** Slack API configuration credentials */
  slack: {
    clientId: string;
    clientSecret: string;
    userToken: string;
    signingSecret: string;
    appToken?: string;
  };
  /** Bot behavior configuration */
  bot: {
    baseUrl: string;
    pollIntervalMs: number;
    statusEmoji: string;
    pausedEmoji: string;
    statusFormat: string;
    port: number;
  };
  db: {
    dialect: 'mysql' | 'sqlite';
    host: string;
    port: number;
    user: string;
    pass: string;
    name: string;
    storage?: string; // For SQLite in testing
  };
}

/**
 * Interface defining the operations for retrieving application configuration.
 * Exposes methods to retrieve deep copies of configuration slices.
 */
/**
 * Interface for application configuration retrieval.
 *
 * @remarks
 * Provides controlled, immutable access to application configuration slices, decoupling services from direct `process.env` access.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IConfigService([IConfigService])
 * ConfigService[ConfigService] -->|Implements| IConfigService
 * AnyService[Consumer Services] -->|Uses| IConfigService
 * ```
 *
 * @example
 * ```typescript
 * const port = configService.get().port;
 * ```
 *
 * @public
 */
export interface IConfigService {
  getSpotifyConfig(): AppConfig['spotify'];
  getSlackConfig(): AppConfig['slack'];
  getBotConfig(): AppConfig['bot'];
  getDbConfig(): AppConfig['db'];
  getFullConfig(): AppConfig;
}
