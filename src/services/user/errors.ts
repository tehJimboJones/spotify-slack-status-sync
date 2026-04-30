/**
 * User service specific errors.
 * @remarks
 * Defines custom exceptions related to user management, such as user not found or validation errors.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Custom error classes for the user service.
 */

/**
 * Exception thrown when a user cannot be located.
 *
 * @remarks
 * A specific domain error indicating that a requested user (typically by Slack ID) does not exist in the data store.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * UserNotFoundError([UserNotFoundError]) -->|Extends| Error[Error]
 * UserService[UserService] -.->|Throws| UserNotFoundError
 * ```
 *
 * @example
 * ```typescript
 * throw new UserNotFoundError('User U123 not found');
 * ```
 *
 * @public
 */
export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found in the repository.') {
    super(message);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
