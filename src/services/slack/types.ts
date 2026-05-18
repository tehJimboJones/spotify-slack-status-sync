/**
 * Type definitions for the Slack service.
 * @remarks
 * Defines domain interfaces for Slack integration, including service contracts and complex Slack API response types.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { User } from '../user/types';
import { ICommandListener } from './command/types';
import { IViewListener } from './view/types';
import { SlackEvent, ViewResponseAction } from '@slack/bolt';
import { Router } from 'express';

export { SlackEvent, ViewResponseAction };

/**
 * Context payload for Slack events.
 *
 * @remarks
 * Encapsulates the event payload provided by the Slack Bolt API, standardizing data access across different event listeners.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IEventContext([IEventContext])
 * IEventListener[IEventListener] -.->|Consumes| IEventContext
 * ```
 *
 * @example
 * ```typescript
 * const ctx: IEventContext = { event: { type: 'reaction_added' } };
 * ```
 *
 * @public
 */
export interface IEventContext {
  body: Record<string, unknown>;
  event: SlackEvent;
}

/**
 * Interface for handling Slack events.
 *
 * @remarks
 * Defines a contract for processing real-time Slack events (like reactions or messages), decoupled from the main Slack service.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IEventListener([IEventListener])
 * ReactionAddedListenerService[ReactionAddedListenerService] -->|Implements| IEventListener
 * ISlackService[ISlackService] -->|Registers| IEventListener
 * ```
 *
 * @example
 * ```typescript
 * slackService.registerEventListener('reaction_added', reactionListener);
 * ```
 *
 * @public
 */
export interface IEventListener {
  eventName: string;
  handle(context: IEventContext, slackService: ISlackService): Promise<void>;
}

/**
 * Interface for Slack API interactions.
 *
 * @remarks
 * Abstracts the Slack bot client, providing methods to send messages, update statuses, and register event/command/view listeners.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ISlackService([ISlackService])
 * SlackService[SlackService] -->|Implements| ISlackService
 * SyncService[SyncService] -->|Uses| ISlackService
 * ```
 *
 * @example
 * ```typescript
 * await slackService.setStatus('U123', 'Working', ':computer:');
 * ```
 *
 * @public
 */
export interface ISlackService {
  sendMessage(
    channelOrUserId: string,
    text: string,
  ): Promise<{ channel: string; messageTimestamp: string } | null>;
  updateMessage(channel: string, messageTimestamp: string, text: string): Promise<void>;
  setStatus(user: User, text: string, emoji: string): Promise<void>;
  clearStatus(user: User): Promise<void>;
  start(): Promise<void>;
  /**
   * Returns the Express Router for the Bolt receiver, to be mounted on the shared app server.
   */
  getRouter(): Router;
  registerCommandListener(listener: ICommandListener): void;
  registerViewListener(listener: IViewListener): void;
  registerEventListener(listener: IEventListener): void;
  openSettingsModal(
    triggerId: string,
    userId: string,
    currentSettings: Partial<User>,
  ): Promise<void>;
}
