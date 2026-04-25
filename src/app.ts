/**
 * Application bootstrapper.
 * Initializes configuration, services, and starts the background processes.
 */
import { loadConfig } from './config';
import { SpotifyService } from './spotify-live';
import { SlackService } from './slack';
import { SyncService } from './sync';

/**
 * Main bootstrapping function that wires up dependencies and starts the bot.
 *
 * @returns {Promise<void>}
 */
async function bootstrap() {
  try {
    const config = loadConfig();

    // Initialize Live Spotify Service
    const spotify = new SpotifyService(config);

    const slack = new SlackService(config);
    const syncService = new SyncService(spotify, slack, config);

    syncService.start();

    console.log('Application bootstrapped successfully.');
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    process.exit(1);
  }
}

bootstrap();
