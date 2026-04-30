/**
 * Type definitions for Slack view listeners.
 * @remarks
 * Contains interfaces and types for handling Slack modal views, block actions, and view submission payloads.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { SlackViewAction, ViewOutput } from '@slack/bolt';
import { ISlackService, ViewResponseAction } from '../types';

/**
 * Context payload for Slack view submissions.
 *
 * @remarks
 * Encapsulates the data provided by the Slack Bolt API when a user submits a modal view, abstracting away Bolt-specific types.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IViewContext([IViewContext])
 * IViewListener[IViewListener] -.->|Consumes| IViewContext
 * ```
 *
 * @example
 * ```typescript
 * const ctx: IViewContext = { user: 'U123', view: { state: { values: {} } } };
 * ```
 *
 * @public
 */
export interface IViewContext {
  ack: (response?: ViewResponseAction) => Promise<void>;
  body: SlackViewAction;
  view: ViewOutput;
}

/**
 * Interface for handling Slack view submissions.
 *
 * @remarks
 * Defines a contract for processing modal submissions, allowing the SlackService to dynamically route view events to registered handlers.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IViewListener([IViewListener])
 * SettingsModalViewListener[SettingsModalViewListener] -->|Implements| IViewListener
 * ISlackService[ISlackService] -->|Registers| IViewListener
 * ```
 *
 * @example
 * ```typescript
 * slackService.registerViewListener('settings_modal', settingsListener);
 * ```
 *
 * @public
 */
export interface IViewListener {
  viewCallbackId: string | RegExp;
  handle(context: IViewContext, slackService: ISlackService): Promise<void>;
}
