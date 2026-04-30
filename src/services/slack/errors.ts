/**
 * Slack service specific errors.
 * @remarks
 * Defines custom exception classes for failures encountered while interacting with the Slack API or handling Slack events.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { AppError } from '../../errors';

/**
 * Exception for Slack message delivery failures.
 *
 * @remarks
 * Thrown when the bot fails to post a message to a Slack channel or user DM.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackMessageSendError([SlackMessageSendError]) -->|Extends| AppError[AppError]
 * SlackService[SlackService] -.->|Throws| SlackMessageSendError
 * ```
 *
 * @example
 * ```typescript
 * throw new SlackMessageSendError('Failed to send message to channel X');
 * ```
 *
 * @public
 */
export class SlackMessageSendError extends AppError {
  constructor(message: string = 'Failed to send message to Slack') {
    super(message, 'SLACK_MESSAGE_SEND_ERROR');
  }
}

/**
 * Exception for Slack message update failures.
 *
 * @remarks
 * Thrown when the bot fails to modify an existing, previously sent message.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackMessageUpdateError([SlackMessageUpdateError]) -->|Extends| AppError[AppError]
 * SlackService[SlackService] -.->|Throws| SlackMessageUpdateError
 * ```
 *
 * @example
 * ```typescript
 * throw new SlackMessageUpdateError('Failed to update message Y');
 * ```
 *
 * @public
 */
export class SlackMessageUpdateError extends AppError {
  constructor(message: string = 'Failed to update message in Slack') {
    super(message, 'SLACK_MESSAGE_UPDATE_ERROR');
  }
}

/**
 * Exception for Slack status modification failures.
 *
 * @remarks
 * Thrown when the application encounters an error while trying to update a user's Slack profile status.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackStatusSetError([SlackStatusSetError]) -->|Extends| AppError[AppError]
 * SlackService[SlackService] -.->|Throws| SlackStatusSetError
 * ```
 *
 * @example
 * ```typescript
 * throw new SlackStatusSetError('Failed to set status for user U123');
 * ```
 *
 * @public
 */
export class SlackStatusSetError extends AppError {
  constructor(message: string = 'Failed to set Slack status') {
    super(message, 'SLACK_STATUS_SET_ERROR');
  }
}

/**
 * Exception for Slack status clearing failures.
 *
 * @remarks
 * Thrown when the application encounters an error while attempting to clear or reset a user's Slack profile status.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackStatusClearError([SlackStatusClearError]) -->|Extends| AppError[AppError]
 * SlackService[SlackService] -.->|Throws| SlackStatusClearError
 * ```
 *
 * @example
 * ```typescript
 * throw new SlackStatusClearError('Failed to clear status');
 * ```
 *
 * @public
 */
export class SlackStatusClearError extends AppError {
  constructor(message: string = 'Failed to clear Slack status') {
    super(message, 'SLACK_STATUS_CLEAR_ERROR');
  }
}

/**
 * Exception for Slack modal rendering failures.
 *
 * @remarks
 * Thrown when the application cannot successfully construct or open the interactive settings modal for a user.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SlackSettingsModalError([SlackSettingsModalError]) -->|Extends| AppError[AppError]
 * SlackService[SlackService] -.->|Throws| SlackSettingsModalError
 * ```
 *
 * @example
 * ```typescript
 * throw new SlackSettingsModalError('Failed to open settings modal');
 * ```
 *
 * @public
 */
export class SlackSettingsModalError extends AppError {
  constructor(message: string = 'Failed to open Slack settings modal') {
    super(message, 'SLACK_SETTINGS_MODAL_ERROR');
  }
}
