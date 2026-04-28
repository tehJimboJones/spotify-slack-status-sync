/**
 * Application bootstrapper.
 * Initializes configuration, services, and starts the background processes.
 */
import { ConfigService } from './services/config/config.service';
import { SpotifyService } from './services/spotify/spotify.service';
import { SlackService } from './services/slack/slack.service';
import { SyncService } from './services/sync/sync.service';
import { CommandListenerService } from './services/slack/command/command-listener.service';
import { UserService } from './services/user/user.service';
import { SettingsModalViewListener } from './services/slack/view/settings-modal-view-listener.service';
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
    const configService = new ConfigService();

    // Initialize Database
    const sequelize = getDbConnection(configService);
    await sequelize.authenticate();
    await sequelize.sync(); // Create tables if they don't exist
    console.log('Database connected and synchronized successfully.');

    // Initialize User Data Persistence Layer
    const userRepository = new SequelizeUserRepository();
    const userService = new UserService(userRepository);

    // Initialize core services
    const spotify = new SpotifyService(configService);
    const slack = new SlackService(configService);
    const syncService = new SyncService(spotify, slack, userService, configService);
    const commandListener = new CommandListenerService(userService, slack, configService);

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
    authApp.use('/auth', createAuthRouter(configService, userService));
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
