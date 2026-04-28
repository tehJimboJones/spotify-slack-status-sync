import { IUserService } from '../../user/types';
import { ISlackService } from '../types';
import { IConfigService } from '../../config/types';
import { UserNotFoundError } from '../../user/errors';
import { ICommandContext, ICommandListener } from './types';

export class CommandListenerService implements ICommandListener {
  public readonly commandName = '/spotifystatus';

  constructor(
    private userService: IUserService,
    private slackService: ISlackService,
    private configService: IConfigService,
  ) {}

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
        const authUrl = `${this.configService.getBotConfig().baseUrl}/auth/start?userId=${context.userId}`;
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
        const authUrl = `${this.configService.getBotConfig().baseUrl}/auth/start?userId=${context.userId}`;
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
