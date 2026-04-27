/**
 * Slack service module.
 * Provides integration with the Slack API to update user profile status.
 */
import { App } from '@slack/bolt';
import { AppConfig } from './config';
import { ICommandListener } from './command';
import { User, IUserService } from './user';

/**
 * Interface defining the operations for interacting with Slack.
 */
export interface ISlackService {
  /**
   * Sets the user's Slack status.
   *
   * @param user - The user whose status is being updated.
   * @param text - The status text to display.
   * @param emoji - The emoji to display next to the status.
   * @returns A promise that resolves when the status is set.
   */
  setStatus(user: User, text: string, emoji: string): Promise<void>;

  /**
   * Clears the user's Slack status.
   *
   * @param user - The user whose status is being cleared.
   * @returns A promise that resolves when the status is cleared.
   */
  clearStatus(user: User): Promise<void>;

  /**
   * Starts the Bolt app listener to receive incoming commands/events.
   *
   * @returns A promise that resolves when the app is started.
   */
  start(): Promise<void>;

  /**
   * Registers a slash command listener with the underlying Bolt app.
   *
   * @param listener - The listener to register.
   */
  registerCommandListener(listener: ICommandListener): void;

  /**
   * Opens the settings modal for a user.
   */
  openSettingsModal(
    triggerId: string,
    userId: string,
    currentSettings: Partial<User>,
  ): Promise<void>;
}

/**
 * Implementation of the Slack service using the @slack/bolt framework.
 */
export class SlackService implements ISlackService {
  private app: App;

  /**
   * Constructs a new SlackService instance.
   *
   * @param config - The application configuration containing Slack credentials.
   * @param userService - The user service for saving settings.
   */
  constructor(
    private config: AppConfig,
    private userService?: IUserService,
  ) {
    this.app = new App({
      token: config.slack.userToken,
      signingSecret: config.slack.signingSecret,
      appToken: config.slack.appToken,
      socketMode: !!config.slack.appToken,
    });

    if (this.userService) {
      this.registerViewListeners();
    }
  }

  private registerViewListeners(): void {
    this.app.view('settings_modal', async ({ ack, body, view }) => {
      await ack();

      const slackUserId = body.user.id;
      const values = view.state.values;

      const statusFormat = values.status_format_block.status_format.value;
      const statusEmoji = values.status_emoji_block.status_emoji.value;
      const pausedEmoji = values.paused_emoji_block.paused_emoji.value;

      if (this.userService) {
        await this.userService.upsertUser(slackUserId, {
          statusFormat: statusFormat || undefined,
          statusEmoji: statusEmoji || undefined,
          pausedEmoji: pausedEmoji || undefined,
        });
      }
    });
  }

  /**
   * Sets the user's Slack status.
   *
   * @param user - The user whose status is being updated.
   * @param text - The status text to display.
   * @param emoji - The emoji to display next to the status.
   * @returns A promise that resolves when the status is set.
   */
  public async setStatus(user: User, text: string, emoji: string): Promise<void> {
    try {
      await this.app.client.users.profile.set({
        token: user.slackUserToken,
        profile: JSON.stringify({
          status_text: text,
          status_emoji: emoji,
          status_expiration: 0,
        }),
      });
      console.log(`Updated Slack status for ${user.slackUserId} to: ${emoji} ${text}`);
    } catch (error) {
      console.error(`Failed to update Slack status for ${user.slackUserId}:`, error);
    }
  }

  /**
   * Clears the user's Slack status.
   *
   * @param user - The user whose status is being cleared.
   * @returns A promise that resolves when the status is cleared.
   */
  public async clearStatus(user: User): Promise<void> {
    try {
      await this.app.client.users.profile.set({
        token: user.slackUserToken,
        profile: JSON.stringify({
          status_text: '',
          status_emoji: '',
          status_expiration: 0,
        }),
      });
      console.log(`Cleared Slack status for ${user.slackUserId}`);
    } catch (error) {
      console.error(`Failed to clear Slack status for ${user.slackUserId}:`, error);
    }
  }

  /**
   * Starts the Bolt app listener.
   *
   * @returns A promise that resolves when the app is started.
   */
  public async start(): Promise<void> {
    await this.app.start(this.config.bot.port);
    console.log(`Slack Bolt app started on port ${this.config.bot.port}`);
  }

  /**
   * Registers a command listener.
   *
   * @param listener - The command listener to register.
   */
  public registerCommandListener(listener: ICommandListener): void {
    this.app.command(listener.commandName, async ({ command, ack, respond }) => {
      await ack();
      await listener.handle({
        userId: command.user_id,
        triggerId: command.trigger_id,
        text: command.text,
        respond: async (text: string) => {
          await respond(text);
        },
      });
    });
  }

  /**
   * Opens the settings modal.
   */
  public async openSettingsModal(
    triggerId: string,
    userId: string,
    currentSettings: Partial<User>,
  ): Promise<void> {
    try {
      await this.app.client.views.open({
        trigger_id: triggerId,
        view: {
          type: 'modal',
          callback_id: 'settings_modal',
          private_metadata: userId,
          title: { type: 'plain_text', text: 'Spotify Status Settings' },
          submit: { type: 'plain_text', text: 'Save' },
          close: { type: 'plain_text', text: 'Cancel' },
          blocks: [
            {
              type: 'input',
              block_id: 'status_format_block',
              element: {
                type: 'plain_text_input',
                action_id: 'status_format',
                initial_value: currentSettings.statusFormat || '{song} - {artist}',
              },
              label: { type: 'plain_text', text: 'Status Format' },
              hint: { type: 'plain_text', text: 'Use {song} and {artist} as placeholders.' },
            },
            {
              type: 'input',
              block_id: 'status_emoji_block',
              element: {
                type: 'plain_text_input',
                action_id: 'status_emoji',
                initial_value: currentSettings.statusEmoji || ':headphones:',
              },
              label: { type: 'plain_text', text: 'Playing Emoji' },
            },
            {
              type: 'input',
              block_id: 'paused_emoji_block',
              element: {
                type: 'plain_text_input',
                action_id: 'paused_emoji',
                initial_value: currentSettings.pausedEmoji || ':double_vertical_bar:',
              },
              label: { type: 'plain_text', text: 'Paused Emoji' },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Failed to open settings modal:', error);
    }
  }
}
