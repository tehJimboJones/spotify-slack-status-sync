import { IUserService } from '../../user/types';
import { IViewContext, IViewListener } from './types';
import { ISlackService } from '../types';

function isValidEmoji(emoji: string | null | undefined): boolean {
  if (!emoji) return true; // Optional fields or fallbacks
  const emojiAliasRegex = /^:[\w+-]+:$/;
  // Basic unicode emoji regex (matches most standard unicode emojis)
  const unicodeEmojiRegex = /\p{Emoji}/u;
  return emojiAliasRegex.test(emoji) || unicodeEmojiRegex.test(emoji);
}

export class SettingsModalViewListener implements IViewListener {
  public readonly viewCallbackId = 'settings_modal';

  constructor(private userService: IUserService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async handle(context: IViewContext, _slackService: ISlackService): Promise<void> {
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

    const errors: Record<string, string> = {};
    const errorMsg =
      'Please enter a valid emoji alias (e.g., :headphones:) or use a standard emoji.';

    if (!isValidEmoji(statusEmoji)) errors['status_emoji_block'] = errorMsg;
    if (!isValidEmoji(pausedEmoji)) errors['paused_emoji_block'] = errorMsg;
    if (!isValidEmoji(podcastStatusEmoji)) errors['podcast_status_emoji_block'] = errorMsg;
    if (!isValidEmoji(podcastPausedEmoji)) errors['podcast_paused_emoji_block'] = errorMsg;

    if (Object.keys(errors).length > 0) {
      await context.ack({
        response_action: 'errors',
        errors,
      });
      return;
    }

    await context.ack();

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
