/**
 * Slack message event listener for acronym guessing.
 * @remarks
 * Listens for messages across monitored channels, detects enabled acronyms, and posts randomly generated guesses under specific bot names.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { IEventListener, IEventContext, ISlackService } from '../types';
import { IAcronymService } from '../../acronym/types';

/**
 * Event listener handling incoming Slack channel messages.
 *
 * @public
 */
export class AcronymMessageListenerService implements IEventListener {
  public readonly eventName = 'message';

  constructor(private acronymService: IAcronymService) {}

  public async handle(context: IEventContext, slackService: ISlackService): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const event = context.event as any;

    // Ignore bot messages to avoid self-triggering feedback loops
    if (event.bot_id || event.subtype === 'bot_message') {
      return;
    }

    if (!event.text || !event.channel) {
      return;
    }

    console.log(
      `[Acronym Guesser] Received message in channel "${event.channel}": "${event.text}"`,
    );

    const isGuessingActive = await this.acronymService.isGuessingActive();
    if (!isGuessingActive) {
      console.log('[Acronym Guesser] Guessing behavior is currently stopped.');
      return;
    }

    const isChannelMonitored = await this.acronymService.isChannelMonitored(event.channel);
    if (!isChannelMonitored) {
      const monitored = await this.acronymService.getMonitoredChannels();
      console.log(
        `[Acronym Guesser] Channel "${event.channel}" is NOT in monitored list: [${monitored.join(', ')}].`,
      );
      return;
    }

    const enabledAcronyms = await this.acronymService.getEnabledAcronyms();
    if (enabledAcronyms.length === 0) {
      console.log('[Acronym Guesser] No acronyms are currently enabled.');
      return;
    }

    for (const acronym of enabledAcronyms) {
      const regex = new RegExp(`\\b${acronym}\\b`, 'i');
      if (regex.test(event.text)) {
        try {
          const { guess, botName } = this.acronymService.generateGuess(acronym);
          console.log(
            `[Acronym Guesser] Matched acronym "${acronym}"! Posting "${guess}" as "${botName || 'Default Bot'}"`,
          );
          // Always reply in a thread: continue an existing thread, or start one
          // under the triggering message instead of posting to the channel.
          await slackService.sendMessage(event.channel, guess, {
            username: botName,
            threadTs: event.thread_ts ?? event.ts,
          });
        } catch (error) {
          console.error(`Failed to generate or send guess for acronym ${acronym}:`, error);
        }
      }
    }
  }
}
