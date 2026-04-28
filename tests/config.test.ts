import { ConfigService } from '../src/services/config/config.service';

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should load configuration from environment variables with defaults', () => {
    process.env.SPOTIFY_CLIENT_ID = 'test_client_id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test_client_secret';
    process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test_refresh_token';
    process.env.SLACK_CLIENT_ID = 'test_slack_client_id';
    process.env.SLACK_CLIENT_SECRET = 'test_slack_client_secret';
    process.env.SLACK_USER_TOKEN = 'xoxp-test';
    process.env.SLACK_SIGNING_SECRET = 'test_signing_secret';

    // Clear out potentially set environment variables from the real .env file
    delete process.env.POLL_INTERVAL_MS;
    delete process.env.STATUS_EMOJI;
    delete process.env.PAUSED_EMOJI;
    delete process.env.STATUS_FORMAT;
    delete process.env.PORT;

    const config = new ConfigService();

    expect(config.getSpotifyConfig().clientId).toBe('test_client_id');
    expect(config.getSlackConfig().userToken).toBe('xoxp-test');
    expect(config.getBotConfig().pollIntervalMs).toBe(60000); // Default
    expect(config.getBotConfig().statusEmoji).toBe(':headphones:'); // Default
    expect(config.getBotConfig().pausedEmoji).toBe(':double_vertical_bar:'); // Default
    expect(config.getBotConfig().statusFormat).toBe('{song} - {artist}'); // Default
    expect(config.getBotConfig().port).toBe(3000); // Default
  });

  it('should override defaults if provided in environment variables', () => {
    process.env.SPOTIFY_CLIENT_ID = 'test_client_id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test_client_secret';
    process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test_refresh_token';
    process.env.SLACK_CLIENT_ID = 'test_slack_client_id';
    process.env.SLACK_CLIENT_SECRET = 'test_slack_client_secret';
    process.env.SLACK_USER_TOKEN = 'xoxp-test';
    process.env.SLACK_SIGNING_SECRET = 'test_signing_secret';

    process.env.POLL_INTERVAL_MS = '30000';
    process.env.STATUS_EMOJI = ':musical_note:';
    process.env.PAUSED_EMOJI = ':pause_button:';
    process.env.STATUS_FORMAT = 'Playing: {song}';
    process.env.PORT = '8080';

    const config = new ConfigService();

    expect(config.getBotConfig().pollIntervalMs).toBe(30000);
    expect(config.getBotConfig().statusEmoji).toBe(':musical_note:');
    expect(config.getBotConfig().pausedEmoji).toBe(':pause_button:');
    expect(config.getBotConfig().statusFormat).toBe('Playing: {song}');
    expect(config.getBotConfig().port).toBe(8080);
  });

  it('should throw an error if required variables are missing', () => {
    // Empty env
    process.env = {};
    expect(() => new ConfigService()).toThrow(/Missing required environment variable/);
  });
  it('should return deep copies from getters to prevent internal state mutation', () => {
    process.env.SPOTIFY_CLIENT_ID = 'test_client_id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test_client_secret';
    process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test_refresh_token';
    process.env.SLACK_CLIENT_ID = 'test_slack_client_id';
    process.env.SLACK_CLIENT_SECRET = 'test_slack_client_secret';
    process.env.SLACK_USER_TOKEN = 'xoxp-test';
    process.env.SLACK_SIGNING_SECRET = 'test_signing_secret';

    const config = new ConfigService();

    // Get a copy and mutate it
    const botConfig = config.getBotConfig();
    botConfig.port = 9999;

    // Verify internal state is unchanged
    expect(config.getBotConfig().port).not.toBe(9999);

    // Get another copy and mutate it
    const spotifyConfig = config.getSpotifyConfig();
    spotifyConfig.clientId = 'mutated';

    // Verify internal state is unchanged
    expect(config.getSpotifyConfig().clientId).toBe('test_client_id');

    // Test getSlackConfig
    const slackConfig = config.getSlackConfig();
    slackConfig.userToken = 'mutated';
    expect(config.getSlackConfig().userToken).toBe('xoxp-test');

    // Test getDbConfig
    const dbConfig = config.getDbConfig();
    dbConfig.user = 'mutated';
    expect(config.getDbConfig().user).toBe('root');

    // Test getFullConfig
    const fullConfig = config.getFullConfig();
    fullConfig.bot.port = 9999;
    expect(config.getFullConfig().bot.port).not.toBe(9999);
  });
});
