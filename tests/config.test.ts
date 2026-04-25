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
    process.env.SLACK_USER_TOKEN = 'xoxp-test';
    process.env.SLACK_SIGNING_SECRET = 'test_signing_secret';

    const config = loadConfig();

    expect(config.spotify.clientId).toBe('test_client_id');
    expect(config.slack.userToken).toBe('xoxp-test');
    expect(config.bot.pollIntervalMs).toBe(60000); // Default
    expect(config.bot.statusEmoji).toBe(':headphones:'); // Default
    expect(config.bot.pausedEmoji).toBe(':double_vertical_bar:'); // Default
    expect(config.bot.statusFormat).toBe('{song} - {artist}'); // Default
  });

  it('should override defaults if provided in environment variables', () => {
    process.env.SPOTIFY_CLIENT_ID = 'test_client_id';
    process.env.SPOTIFY_CLIENT_SECRET = 'test_client_secret';
    process.env.SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';
    process.env.SPOTIFY_REFRESH_TOKEN = 'test_refresh_token';
    process.env.SLACK_USER_TOKEN = 'xoxp-test';
    process.env.SLACK_SIGNING_SECRET = 'test_signing_secret';

    process.env.POLL_INTERVAL_MS = '30000';
    process.env.STATUS_EMOJI = ':musical_note:';
    process.env.PAUSED_EMOJI = ':pause_button:';
    process.env.STATUS_FORMAT = 'Playing: {song}';

    const config = loadConfig();

    expect(config.bot.pollIntervalMs).toBe(30000);
    expect(config.bot.statusEmoji).toBe(':musical_note:');
    expect(config.bot.pausedEmoji).toBe(':pause_button:');
    expect(config.bot.statusFormat).toBe('Playing: {song}');
  });

  it('should throw an error if required variables are missing', () => {
    // Empty env
    process.env = {};
    expect(() => loadConfig()).toThrow(/Missing required environment variable/);
  });
});
