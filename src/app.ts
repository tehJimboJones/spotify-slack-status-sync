/**
 * Application entry point and initialization.
 * @remarks
 * Bootstraps the Express server and Slack bot, initializes the database connection, and wires up all application services and routes.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
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
import { ReactionAddedListenerService } from './services/slack/event/reaction-added-listener.service';
import { SessionRepository } from './services/session/session.repository';
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

    // Initialize Session Persistence Layer
    const sessionRepository = new SessionRepository();

    // Initialize core services
    const spotify = new SpotifyService(configService);
    const slack = new SlackService(configService);
    const syncService = new SyncService(spotify, slack, userService, configService);
    const commandListener = new CommandListenerService(
      userService,
      configService,
      sessionRepository,
    );
    const reactionListener = new ReactionAddedListenerService(userService, sessionRepository);
    const settingsModalViewListener = new SettingsModalViewListener(userService);

    slack.registerCommandListener(commandListener);
    slack.registerViewListener(settingsModalViewListener);
    slack.registerEventListener(reactionListener);

    // Initialize Bolt (establishes WS connection in Socket Mode)
    await slack.start();

    // Single shared Express server
    const app = express();
    const port = configService.getBotConfig().port;

    // Mount Bolt's receiver router (handles POST /slack/events)
    app.use(slack.getRouter());

    // Mount auth routes
    app.use('/auth', createAuthRouter(configService, userService));

    // Start background sync
    syncService.start();

    // One port to rule them all
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    console.log('Application bootstrapped successfully.');
  } catch (error) {
    console.error('Failed to bootstrap application:', error);
    if (error && typeof error === 'object' && 'parent' in error) {
      const innerError = (error as { parent: unknown }).parent;
      logErrors(innerError);
    }
    process.exit(1);
  }
}

function logErrors(error: unknown) {
  console.error('Failed to bootstrap application:', error);
  if (error && typeof error === 'object' && 'errors' in error) {
    const errObj = error as { errors: unknown[] };
    if (Array.isArray(errObj.errors)) {
      for (const inner of errObj.errors) {
        logErrors(inner);
      }
    }
  }
}

bootstrap();
