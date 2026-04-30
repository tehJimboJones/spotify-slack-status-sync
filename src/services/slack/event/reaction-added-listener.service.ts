/**
 * Slack reaction added event handler.
 * @remarks
 * Listens for reaction events in Slack, enabling interactive workflows like emoji selection based on user reactions.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { IEventListener, IEventContext, ISlackService } from '../types';
import { IUserService } from '../../user/types';
import { ISessionRepository } from '../../session/types';

/**
 * Handler for the `reaction_added` Slack event.
 *
 * @remarks
 * Processes user emoji reactions, specifically looking for interactions related to the emoji configuration workflow to capture user preferences.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ReactionAddedListenerService([ReactionAddedListenerService]) -->|Implements| IEventListener[IEventListener]
 * ReactionAddedListenerService -->|Uses| ISessionRepository[ISessionRepository]
 * Client[App Bootstrap] -.->|Instantiates| ReactionAddedListenerService
 * ```
 *
 * @example
 * ```typescript
 * const listener = new ReactionAddedListenerService(sessionRepo);
 * ```
 *
 * @public
 */
export class ReactionAddedListenerService implements IEventListener {
  public readonly eventName = 'reaction_added';

  constructor(
    private userService: IUserService,
    private sessionRepository: ISessionRepository,
  ) {}

  public async handle(context: IEventContext, slackService: ISlackService): Promise<void> {
    const { event } = context;

    // Ignore reactions from bots or if item.ts is missing
    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (!(event as any).user || !(event as any).item || !(event as any).item.ts) {
      return;
    }

    const messageTs = (event as any).item.ts;
    const session = await this.sessionRepository.findByMessageTs(messageTs);

    if (!session) {
      // Not a configuration message we are tracking
      return;
    }

    // Slack gives us the emoji without colons, e.g., 'headphones' or '+1'
    const emojiAlias = `:${(event as any).reaction}:`;

    // Save the new setting
    await this.userService.upsertUser((event as any).user, {
      [session.settingType]: emojiAlias,
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Send a confirmation and remove the old instructions
    try {
      await slackService.updateMessage(
        session.channelId,
        session.messageTs,
        `✅ Your ${session.settingType} emoji has been updated to ${emojiAlias}!`,
      );
    } catch (error) {
      console.error('Failed to update confirmation message:', error);
    }

    // Delete the session since it's fulfilled
    await this.sessionRepository.deleteSession(session.id);
  }
}
