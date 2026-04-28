import { IUserService } from '../../user/types';
import { ISlackService } from '../types';
import { IConfigService } from '../../config/types';
import { UserNotFoundError } from '../../user/errors';
import { ICommandContext, ICommandListener } from './types';
import { ISessionRepository } from '../../session/types';

export class CommandListenerService implements ICommandListener {
  public readonly commandName = '/spotifystatus';

  constructor(
    private userService: IUserService,
    private configService: IConfigService,
    private sessionRepository?: ISessionRepository,
  ) {}

  public async handle(context: ICommandContext, slackService: ISlackService): Promise<void> {
    const args = context.text.trim().toLowerCase();

    try {
      if (args === 'start') {
        await this.userService.toggleUserSync(context.userId, true);
        await context.respond('Spotify status sync started! :headphones:');
      } else if (args === 'stop') {
        await this.userService.toggleUserSync(context.userId, false);
        const user = await this.userService.getUser(context.userId);
        if (user) {
          try {
            await slackService.clearStatus(user);
          } catch (error) {
            console.error('Failed to clear status during stop command:', error);
          }
        }
        await context.respond('Spotify status sync stopped. :octagonal_sign:');
      } else if (args === 'login') {
        const authUrl = `${this.configService.getBotConfig().baseUrl}/auth/start?userId=${context.userId}`;
        await context.respond(
          `Please authenticate to link your Slack and Spotify accounts: <${authUrl}|Link Accounts>`,
        );
      } else if (args === 'settings') {
        const user = await this.userService.getUser(context.userId);
        await slackService.openSettingsModal(context.triggerId, context.userId, user || {});
      } else if (args === 'emojis') {
        await this.handleEmojisCommand(context, slackService);
      } else {
        await context.respond(
          'Unknown command. Please use `/spotifystatus start`, `stop`, `login`, `settings`, or `emojis`.',
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

  private async handleEmojisCommand(
    context: ICommandContext,
    slackService: ISlackService,
  ): Promise<void> {
    if (!this.sessionRepository) {
      await context.respond('Emoji configuration is not enabled.');
      return;
    }

    const { userId } = context;

    // 1. Cleanup old active sessions
    const activeSessions = await this.sessionRepository.findActiveSessions(userId);

    for (const session of activeSessions) {
      try {
        await slackService.updateMessage(
          session.channelId,
          session.messageTs,
          `~React to this message to set your ${session.settingType} emoji~\n*(This configuration message has expired)*`,
        );
        await this.sessionRepository.deleteSession(session.id);
      } catch (error) {
        console.error(`Failed to cleanup session ${session.id}:`, error);
      }
    }

    // 2. Send new messages
    const settings: (
      | 'statusEmoji'
      | 'pausedEmoji'
      | 'podcastStatusEmoji'
      | 'podcastPausedEmoji'
    )[] = ['statusEmoji', 'pausedEmoji', 'podcastStatusEmoji', 'podcastPausedEmoji'];

    for (const setting of settings) {
      try {
        const response = await slackService.sendMessage(
          userId, // DMs can be opened by sending to userId
          `React to this message to set your **${setting}** emoji.`,
        );

        if (response?.messageTimestamp) {
          await this.sessionRepository.createSession({
            userId,
            channelId: response.channel,
            messageTs: response.messageTimestamp,
            settingType: setting,
          });
        }
      } catch (error) {
        console.error(`Failed to send setup message for ${setting}:`, error);
      }
    }

    await context.respond(
      'Sent you a direct message to configure your emojis! Please check your DMs.',
    );
  }
}
