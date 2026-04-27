/**
 * View listening module.
 * Provides the interfaces and business logic for interacting with Slack views (modals).
 */
import { IUserService } from './user';
import { SlackViewAction, ViewOutput } from '@slack/bolt';

/**
 * Context payload injected into view handlers.
 */
export interface IViewContext {
  ack: () => Promise<void>;
  body: SlackViewAction;
  view: ViewOutput;
}

/**
 * Interface for view listener services.
 */
export interface IViewListener {
  viewCallbackId: string | RegExp;
  handle(context: IViewContext): Promise<void>;
}

/**
 * Service to handle the settings_modal view submission.
 */
export class SettingsModalViewListener implements IViewListener {
  public readonly viewCallbackId = 'settings_modal';

  /**
   * Constructs the SettingsModalViewListener.
   *
   * @param userService - The user service to save settings.
   */
  constructor(private userService: IUserService) {}

  /**
   * Handles incoming view submissions.
   *
   * @param context - The view context.
   * @returns A promise that resolves when the view is handled.
   */
  public async handle(context: IViewContext): Promise<void> {
    await context.ack();

    const slackUserId = context.body.user.id;
    const values = context.view.state.values;

    const statusFormat = values.status_format_block?.status_format?.value;
    const statusEmoji = values.status_emoji_block?.status_emoji?.value;
    const pausedEmoji = values.paused_emoji_block?.paused_emoji?.value;

    const syncPodcasts =
      (values.sync_podcasts_block?.sync_podcasts?.selected_options?.length || 0) > 0;
    const podcastStatusFormat = values.podcast_status_format_block?.podcast_status_format?.value;
    const podcastStatusEmoji = values.podcast_status_emoji_block?.podcast_status_emoji?.value;
    const podcastPausedEmoji = values.podcast_paused_emoji_block?.podcast_paused_emoji?.value;

    await this.userService.upsertUser(slackUserId, {
      statusFormat: statusFormat || undefined,
      statusEmoji: statusEmoji || undefined,
      pausedEmoji: pausedEmoji || undefined,
      syncPodcasts: syncPodcasts,
      podcastStatusFormat: podcastStatusFormat || undefined,
      podcastStatusEmoji: podcastStatusEmoji || undefined,
      podcastPausedEmoji: podcastPausedEmoji || undefined,
    });
  }
}
