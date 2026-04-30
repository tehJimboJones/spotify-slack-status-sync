/**
 * Application configuration management service.
 * @remarks
 * Centralizes environment variable parsing and validation, exposing typed configuration slices to the rest of the application.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import * as dotenv from 'dotenv';
import { AppConfig, IConfigService } from './types';

// Load environment variables from .env file if present
dotenv.config();

/**
 * Service responsible for loading and providing application configuration.
 */
/**
 * Centralized configuration management service.
 *
 * @remarks
 * Parses, validates, and serves application configuration from environment variables, ensuring defaults and immutability.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ConfigService([ConfigService]) -->|Implements| IConfigService[IConfigService]
 * Client[App Bootstrap] -.->|Instantiates| ConfigService
 * ```
 *
 * @example
 * ```typescript
 * const configService = new ConfigService();
 * ```
 *
 * @public
 */
export class ConfigService implements IConfigService {
  private config: AppConfig;

  constructor() {
    this.config = this.loadFromEnv();
  }

  /**
   * Loads the application configuration from environment variables.
   * Validates that all required variables are present.
   *
   * @returns The loaded and validated configuration object.
   * @throws {Error} If any required environment variable is missing.
   */
  private loadFromEnv(): AppConfig {
    const requiredEnvVars = [
      'SPOTIFY_CLIENT_ID',
      'SPOTIFY_CLIENT_SECRET',
      'SPOTIFY_REDIRECT_URI',
      'SPOTIFY_REFRESH_TOKEN',
      'SLACK_CLIENT_ID',
      'SLACK_CLIENT_SECRET',
      'SLACK_USER_TOKEN',
      'SLACK_SIGNING_SECRET',
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    return {
      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID as string,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
        redirectUri: process.env.SPOTIFY_REDIRECT_URI as string,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN as string,
      },
      slack: {
        clientId: process.env.SLACK_CLIENT_ID as string,
        clientSecret: process.env.SLACK_CLIENT_SECRET as string,
        userToken: process.env.SLACK_USER_TOKEN as string,
        signingSecret: process.env.SLACK_SIGNING_SECRET as string,
        appToken: process.env.SLACK_APP_TOKEN,
      },
      bot: {
        baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || '3000'}`,
        pollIntervalMs: parseInt(process.env.POLL_INTERVAL_MS || '60000', 10),
        statusEmoji: process.env.STATUS_EMOJI || ':headphones:',
        pausedEmoji: process.env.PAUSED_EMOJI || ':double_vertical_bar:',
        statusFormat: process.env.STATUS_FORMAT || '{song} - {artist}',
        port: parseInt(process.env.PORT || '3000', 10),
      },
      db: {
        dialect: (process.env.DB_DIALECT as 'mysql' | 'sqlite') || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER || 'root',
        pass: process.env.DB_PASS || '',
        name: process.env.DB_NAME || 'spotify_status_bot',
        storage: process.env.DB_STORAGE, // e.g. ':memory:' for tests
      },
    };
  }

  public getSpotifyConfig(): AppConfig['spotify'] {
    return structuredClone(this.config.spotify);
  }

  public getSlackConfig(): AppConfig['slack'] {
    return structuredClone(this.config.slack);
  }

  public getBotConfig(): AppConfig['bot'] {
    return structuredClone(this.config.bot);
  }

  public getDbConfig(): AppConfig['db'] {
    return structuredClone(this.config.db);
  }

  public getFullConfig(): AppConfig {
    return structuredClone(this.config);
  }
}
