import { App } from '@slack/bolt';
import { IConfigService } from '../config/types';
import { User } from '../user/types';
import { ICommandListener } from './command/types';
import { IViewListener } from './view/types';
import { ISlackService } from './types';

export class SlackService implements ISlackService {
  private app: App;

  constructor(private configService: IConfigService) {
    this.app = new App({
      token: configService.getSlackConfig().userToken,
      signingSecret: configService.getSlackConfig().signingSecret,
      appToken: configService.getSlackConfig().appToken,
      socketMode: !!configService.getSlackConfig().appToken,
    });
  }

  public registerViewListener(listener: IViewListener): void {
    this.app.view(listener.viewCallbackId, async ({ ack, body, view }) => {
      await listener.handle({ ack, body, view });
    });
  }

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

  public async start(): Promise<void> {
    await this.app.start(this.configService.getBotConfig().port);
    console.log(`Slack Bolt app started on port ${this.configService.getBotConfig().port}`);
  }

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
            {
              type: 'input',
              block_id: 'sync_podcasts_block',
              optional: true,
              element: {
                type: 'checkboxes',
                action_id: 'sync_podcasts',
                initial_options: currentSettings.syncPodcasts
                  ? [
                      {
                        text: { type: 'plain_text', text: 'Sync Podcasts' },
                        value: 'true',
                      },
                    ]
                  : undefined,
                options: [
                  {
                    text: { type: 'plain_text', text: 'Sync Podcasts' },
                    value: 'true',
                  },
                ],
              },
              label: { type: 'plain_text', text: 'Podcasts' },
            },
            {
              type: 'input',
              block_id: 'podcast_status_format_block',
              element: {
                type: 'plain_text_input',
                action_id: 'podcast_status_format',
                initial_value:
                  currentSettings.podcastStatusFormat || '{podcast name} - {episode title}',
              },
              label: { type: 'plain_text', text: 'Podcast Status Format' },
              hint: {
                type: 'plain_text',
                text: 'Use {podcast name} and {episode title} as placeholders.',
              },
            },
            {
              type: 'input',
              block_id: 'podcast_status_emoji_block',
              element: {
                type: 'plain_text_input',
                action_id: 'podcast_status_emoji',
                initial_value: currentSettings.podcastStatusEmoji || ':microphone:',
              },
              label: { type: 'plain_text', text: 'Podcast Playing Emoji' },
            },
            {
              type: 'input',
              block_id: 'podcast_paused_emoji_block',
              element: {
                type: 'plain_text_input',
                action_id: 'podcast_paused_emoji',
                initial_value: currentSettings.podcastPausedEmoji || ':double_vertical_bar:',
              },
              label: { type: 'plain_text', text: 'Podcast Paused Emoji' },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Failed to open settings modal:', error);
    }
  }
}
