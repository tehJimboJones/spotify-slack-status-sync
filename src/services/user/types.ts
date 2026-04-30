/**
 * Type definitions for the user service.
 * @remarks
 * Defines the domain interfaces and DTOs representing a user, their preferences, and external account linkages.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Domain model interface for a User.
 *
 * @remarks
 * Represents the core User entity in the application, storing Slack identifiers, Spotify tokens, and configuration preferences for status syncing.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * User([User])
 * Client[UserService] -.->|Uses| User
 * Client2[UserRepository] -.->|Returns| User
 * ```
 *
 * @example
 * ```typescript
 * const user: User = { slackId: 'U123', isSyncEnabled: true };
 * ```
 *
 * @public
 */
export interface User {
  id: string;
  slackUserId: string;
  slackUserToken: string;
  spotifyRefreshToken: string;
  isSyncActive: boolean;
  statusFormat: string;
  statusEmoji: string;
  pausedEmoji: string;
  syncPodcasts: boolean;
  podcastStatusFormat: string;
  podcastStatusEmoji: string;
  podcastPausedEmoji: string;
}

/**
 * Data access interface for User entities.
 *
 * @remarks
 * Abstracts the underlying database operations (e.g., Sequelize) for managing User records, allowing for dependency injection and mock implementations.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IUserRepository([IUserRepository])
 * SequelizeUserRepository[SequelizeUserRepository] -->|Implements| IUserRepository
 * UserService[UserService] -->|Uses| IUserRepository
 * ```
 *
 * @example
 * ```typescript
 * const user = await userRepository.findBySlackId('U123');
 * ```
 *
 * @public
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findBySlackId(slackId: string): Promise<User | null>;
  update(slackId: string, data: Partial<User>): Promise<void>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

/**
 * Business logic interface for user management.
 *
 * @remarks
 * Defines the contract for user-related operations, decoupling dependent services (like Sync or Slack command listeners) from the concrete UserService implementation.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * IUserService([IUserService])
 * UserService[UserService] -->|Implements| IUserService
 * SyncService[SyncService] -->|Uses| IUserService
 * ```
 *
 * @example
 * ```typescript
 * await userService.updateUserSyncPreference('U123', true);
 * ```
 *
 * @public
 */
export interface IUserService {
  getUser(slackId: string): Promise<User>;
  getActiveUsers(): Promise<User[]>;
  toggleUserSync(slackId: string, isSyncActive: boolean): Promise<void>;
  upsertUser(slackId: string, data: Partial<User>): Promise<void>;
}
