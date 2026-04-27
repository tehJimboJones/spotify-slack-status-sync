import { loadConfig } from '../src/config';

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

    const config = loadConfig();

    expect(config.spotify.clientId).toBe('test_client_id');
    expect(config.slack.userToken).toBe('xoxp-test');
    expect(config.bot.pollIntervalMs).toBe(60000); // Default
    expect(config.bot.statusEmoji).toBe(':headphones:'); // Default
    expect(config.bot.pausedEmoji).toBe(':double_vertical_bar:'); // Default
    expect(config.bot.statusFormat).toBe('{song} - {artist}'); // Default
    expect(config.bot.port).toBe(3000); // Default
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

    const config = loadConfig();

    expect(config.bot.pollIntervalMs).toBe(30000);
    expect(config.bot.statusEmoji).toBe(':musical_note:');
    expect(config.bot.pausedEmoji).toBe(':pause_button:');
    expect(config.bot.statusFormat).toBe('Playing: {song}');
    expect(config.bot.port).toBe(8080);
  });

  it('should throw an error if required variables are missing', () => {
    // Empty env
    process.env = {};
    expect(() => loadConfig()).toThrow(/Missing required environment variable/);
  });
});
