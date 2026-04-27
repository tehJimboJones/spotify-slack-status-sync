/**
 * Configuration module for the Spotify Status Bot.
 * Handles loading and validating environment variables.
 */
import * as dotenv from 'dotenv';

// Load environment variables from .env file if present
dotenv.config();

/**
 * Represents the structured application configuration.
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
 * Loads the application configuration from environment variables.
 * Validates that all required variables are present.
 *
 * @returns The loaded and validated configuration object.
 * @throws {Error} If any required environment variable is missing.
 */
export function loadConfig(): AppConfig {
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
