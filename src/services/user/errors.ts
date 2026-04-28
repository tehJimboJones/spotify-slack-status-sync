/**
 * Custom error classes for the user service.
 */

export class UserNotFoundError extends Error {
  constructor(message: string = 'User not found in the repository.') {
    super(message);
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
