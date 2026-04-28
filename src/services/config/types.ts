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
 * Interface defining the operations for retrieving application configuration.
 * Exposes methods to retrieve deep copies of configuration slices.
 */
export interface IConfigService {
  getSpotifyConfig(): AppConfig['spotify'];
  getSlackConfig(): AppConfig['slack'];
  getBotConfig(): AppConfig['bot'];
  getDbConfig(): AppConfig['db'];
  getFullConfig(): AppConfig;
}
