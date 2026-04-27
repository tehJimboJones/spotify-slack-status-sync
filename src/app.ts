/**
 * Application bootstrapper.
 * Initializes configuration, services, and starts the background processes.
 */
import { loadConfig } from './config';
import { SpotifyService } from './spotify-live';
import { SlackService } from './slack';
import { SyncService } from './sync';
import { CommandListenerService } from './command';
import { UserService } from './user';
import { SettingsModalViewListener } from './view';
import { getDbConnection } from './db/connection';
import { SequelizeUserRepository } from './db/repositories/UserRepository';
import express from 'express';
import { createAuthRouter } from './routes/auth';

/**
 * Main bootstrapping function that wires up dependencies and starts the bot.
 *
 * @returns A promise that resolves when bootstrapping completes.
 */
async function bootstrap() {
  try {
    const config = loadConfig();

    // Initialize Database
    const sequelize = getDbConnection(config);
    await sequelize.authenticate();
    await sequelize.sync(); // Create tables if they don't exist
    console.log('Database connected and synchronized successfully.');

    // Initialize User Data Persistence Layer
    const userRepository = new SequelizeUserRepository();
    const userService = new UserService(userRepository);

    // Initialize core services
    const spotify = new SpotifyService(config);
    const slack = new SlackService(config);
    const syncService = new SyncService(spotify, slack, userService, config);
    const commandListener = new CommandListenerService(userService, slack, config);

    slack.registerCommandListener(commandListener);
    const settingsModalViewListener = new SettingsModalViewListener(userService);
    slack.registerViewListener(settingsModalViewListener);

    // Start the Slack Bolt app to listen for commands
    await slack.start();

    // Start background sync
    syncService.start();

    // Start Express server for OAuth callbacks
    const authApp = express();
    const authPort = parseInt(process.env.AUTH_PORT || '3001', 10);
    authApp.use('/auth', createAuthRouter(config, userService));
    authApp.listen(authPort, () => {
      console.log(`Auth Express server started on port ${authPort}`);
    });

    console.log('Application bootstrapped successfully.');
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    process.exit(1);
  }
}

bootstrap();
