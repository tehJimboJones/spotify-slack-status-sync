/**
 * Core Slack integration service.
 * @remarks
 * Wraps the Slack Bolt API, managing the bot's connection, exposing methods for sending messages or updating status, and orchestrating event listeners.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { App, ExpressReceiver } from '@slack/bolt';
import { Router } from 'express';
import { IConfigService } from '../config/types';
import { User } from '../user/types';
import { ICommandListener } from './command/types';
import { IViewListener } from './view/types';
import { ISlackService, IEventListener } from './types';
import {
  SlackMessageSendError,
  SlackMessageUpdateError,
  SlackStatusSetError,
  SlackStatusClearError,
  SlackSettingsModalError,
} from './errors';

/**
 * Concrete implementation of the Slack integration.
 *
 * @remarks
 * Wraps the `@slack/bolt` framework, managing the bot's WebSocket connection and mediating all outbound calls and inbound events.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackService([SlackService]) -->|Implements| ISlackService[ISlackService]
 * SlackService -->|Uses| IConfigService[IConfigService]
 * Client[App Bootstrap] -.->|Instantiates| SlackService
 * ```
 *
 * @example
 * ```typescript
 * const slackService = new SlackService(configService);
 * ```
 *
 * @public
 */
export class SlackService implements ISlackService {
  private app: App;
  private receiver: ExpressReceiver;

  constructor(private configService: IConfigService) {
    this.receiver = new ExpressReceiver({
      signingSecret: configService.getSlackConfig().signingSecret,
    });
    this.app = new App({
      token: configService.getSlackConfig().userToken,
      appToken: configService.getSlackConfig().appToken,
      receiver: this.receiver,
    });
  }

  public async sendMessage(
    channelOrUserId: string,
    text: string,
  ): Promise<{ channel: string; messageTimestamp: string } | null> {
    try {
      const response = await this.app.client.chat.postMessage({
        channel: channelOrUserId,
        text,
      });

      if (response.ok && response.channel && response.ts) {
        return {
          channel: response.channel,
          messageTimestamp: response.ts,
        };
      }
      return null;
    } catch (error) {
      console.error(`Failed to send message to ${channelOrUserId}:`, error);
      throw new SlackMessageSendError(
        `Failed to send message to ${channelOrUserId}: ${(error as Error).message}`,
      );
    }
  }

  public async updateMessage(
    channel: string,
    messageTimestamp: string,
    text: string,
  ): Promise<void> {
    try {
      await this.app.client.chat.update({
        channel,
        ts: messageTimestamp,
        text,
      });
    } catch (error) {
      console.error(`Failed to update message ${messageTimestamp} in ${channel}:`, error);
      throw new SlackMessageUpdateError(
        `Failed to update message ${messageTimestamp} in ${channel}: ${(error as Error).message}`,
      );
    }
  }

  public registerEventListener(listener: IEventListener): void {
    this.app.event(listener.eventName, async ({ event, body }) => {
      await listener.handle({ event, body }, this);
    });
  }

  public registerViewListener(listener: IViewListener): void {
    this.app.view(listener.viewCallbackId, async ({ ack, body, view }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await listener.handle({ ack: ack as any, body, view }, this);
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
      throw new SlackStatusSetError(
        `Failed to update Slack status for ${user.slackUserId}: ${(error as Error).message}`,
      );
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
      throw new SlackStatusClearError(
        `Failed to clear Slack status for ${user.slackUserId}: ${(error as Error).message}`,
      );
    }
  }

  public async start(): Promise<void> {
    // Wire all registered listeners into the ExpressReceiver's middleware
    // chain without starting a second HTTP server. The shared Express server
    // in app.ts owns the HTTP lifecycle; events arrive at POST /slack/events.
    await this.app.init();
    console.log('Slack Bolt app initialized. Listening for events at POST /slack/events.');
  }

  public getRouter(): Router {
    // ExpressReceiver bundles its own @types/express (v4) which diverges from
    // the project's express@5 types at the structural level. Both are
    // wire-compatible at runtime; the cast is intentional and safe.
    return this.receiver.router as unknown as Router;
  }

  public registerCommandListener(listener: ICommandListener): void {
    this.app.command(listener.commandName, async ({ command, ack, respond }) => {
      await ack();
      await listener.handle(
        {
          userId: command.user_id,
          triggerId: command.trigger_id,
          text: command.text,
          respond: async (text: string) => {
            await respond(text);
          },
        },
        this,
      );
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
      throw new SlackSettingsModalError(
        `Failed to open settings modal: ${(error as Error).message}`,
      );
    }
  }
}
