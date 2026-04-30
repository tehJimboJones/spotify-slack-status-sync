/**
 * Type definitions for Slack commands.
 * @remarks
 * Contains types and interfaces related to handling Slack slash commands and their corresponding payloads.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { ISlackService } from '../types';

/**
 * Context payload for Slack slash commands.
 *
 * @remarks
 * Standardizes the data received from Slack when a slash command is invoked, decoupling listeners from framework-specific payloads.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ICommandContext([ICommandContext])
 * ICommandListener[ICommandListener] -.->|Consumes| ICommandContext
 * ```
 *
 * @example
 * ```typescript
 * const ctx: ICommandContext = { command: '/spotify', text: 'on', user: 'U123' };
 * ```
 *
 * @public
 */
export interface ICommandContext {
  userId: string;
  triggerId: string;
  text: string;
  respond: (text: string) => Promise<void>;
}

/**
 * Interface for handling Slack slash commands.
 *
 * @remarks
 * Defines the contract for processing specific slash command invocations, allowing multiple command behaviors to be registered independently.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ICommandListener([ICommandListener])
 * CommandListenerService[CommandListenerService] -->|Implements| ICommandListener
 * ISlackService[ISlackService] -->|Registers| ICommandListener
 * ```
 *
 * @example
 * ```typescript
 * slackService.registerCommandListener('/spotify', commandListener);
 * ```
 *
 * @public
 */
export interface ICommandListener {
  commandName: string;
  handle(context: ICommandContext, slackService: ISlackService): Promise<void>;
}
