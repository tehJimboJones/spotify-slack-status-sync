import { IUserService } from '../../user/types';
import { IViewContext, IViewListener } from './types';

export class SettingsModalViewListener implements IViewListener {
  public readonly viewCallbackId = 'settings_modal';

  constructor(private userService: IUserService) {}

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
