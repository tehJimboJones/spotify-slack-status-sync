/**
 * Command listening module.
 * Provides the interfaces and business logic for interacting with Slack commands.
 */
import { IUserService } from './user';
import { ISlackService } from './slack';
import { AppConfig } from './config';
import { UserNotFoundError } from './errors';

/**
 * Context payload injected into command handlers.
 */
export interface ICommandContext {
  userId: string;
  triggerId: string;
  text: string;
  respond: (text: string) => Promise<void>;
}

/**
 * Interface for command listener services.
 */
export interface ICommandListener {
  commandName: string;
  handle(context: ICommandContext): Promise<void>;
}

/**
 * Service to handle the /spotifystatus slash command.
 */
export class CommandListenerService implements ICommandListener {
  public readonly commandName = '/spotifystatus';

  /**
   * Constructs the CommandListenerService.
   *
   * @param userService - The user service to toggle states.
   * @param slackService - The Slack service to open modals.
   * @param config - The application configuration.
   */
  constructor(
    private userService: IUserService,
    private slackService: ISlackService,
    private config: AppConfig,
  ) {}

  /**
   * Handles incoming command payloads.
   *
   * @param context - The command context.
   * @returns A promise that resolves when the command is handled.
   */
  public async handle(context: ICommandContext): Promise<void> {
    const args = context.text.trim().toLowerCase();

    try {
      if (args === 'start') {
        await this.userService.toggleUserSync(context.userId, true);
        await context.respond('Spotify status sync started! :headphones:');
      } else if (args === 'stop') {
        await this.userService.toggleUserSync(context.userId, false);
        await context.respond('Spotify status sync stopped. :octagonal_sign:');
      } else if (args === 'login') {
        const authUrl = `${this.config.bot.baseUrl}/auth/start?userId=${context.userId}`;
        await context.respond(
          `Please authenticate to link your Slack and Spotify accounts: <${authUrl}|Link Accounts>`,
        );
      } else if (args === 'settings') {
        const user = await this.userService.getUser(context.userId);
        await this.slackService.openSettingsModal(context.triggerId, context.userId, user || {});
      } else {
        await context.respond(
          'Unknown command. Please use `/spotifystatus start`, `stop`, `login`, or `settings`.',
        );
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        const authUrl = `${this.config.bot.baseUrl}/auth/start?userId=${context.userId}`;
        await context.respond(
          `We couldn't find your account! Please link your Slack and Spotify accounts first by clicking here: <${authUrl}|Link Accounts>`,
        );
      } else {
        console.error('Error handling command:', error);
        await context.respond('An unexpected error occurred while processing your command.');
      }
    }
  }
}
