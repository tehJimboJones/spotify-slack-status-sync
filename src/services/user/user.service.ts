/**
 * Core user management service.
 * @remarks
 * Encapsulates business logic for user lifecycle management, including registration, profile updates, and retrieving synchronized users.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { UserNotFoundError } from './errors';
import { User, IUserRepository, IUserService } from './types';

/**
 * Core service for managing user entities.
 *
 * @remarks
 * Encapsulates business logic for user operations, bridging the Slack and Spotify integrations by managing user preferences, tokens, and database persistence.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * UserService([UserService]) -->|Implements| IUserService[IUserService]
 * UserService -->|Uses| IUserRepository[IUserRepository]
 * Client[App Bootstrap] -.->|Instantiates| UserService
 * ```
 *
 * @example
 * ```typescript
 * const userService = new UserService(userRepository);
 * ```
 *
 * @public
 */
export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  public async getUser(slackId: string): Promise<User> {
    const user = await this.userRepository.findBySlackId(slackId);
    if (!user) {
      throw new UserNotFoundError(`User with Slack ID ${slackId} not found.`);
    }
    return user;
  }

  public async getActiveUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.filter((u) => u.isSyncActive);
  }

  public async toggleUserSync(slackId: string, isSyncActive: boolean): Promise<void> {
    const user = await this.userRepository.findBySlackId(slackId);
    if (user) {
      await this.userRepository.update(slackId, { isSyncActive });
    } else {
      throw new UserNotFoundError(`User with Slack ID ${slackId} not found.`);
    }
  }

  public async upsertUser(slackId: string, data: Partial<User>): Promise<void> {
    const existing = await this.userRepository.findBySlackId(slackId);
    if (existing) {
      await this.userRepository.update(slackId, data);
    } else {
      await this.userRepository.create({
        slackUserId: slackId,
        slackUserToken: data.slackUserToken || '',
        spotifyRefreshToken: data.spotifyRefreshToken || '',
        isSyncActive: data.isSyncActive ?? true,
        statusFormat: data.statusFormat || '{song} - {artist}',
        statusEmoji: data.statusEmoji || ':headphones:',
        pausedEmoji: data.pausedEmoji || ':double_vertical_bar:',
        syncPodcasts: data.syncPodcasts ?? false,
        podcastStatusFormat: data.podcastStatusFormat || '{podcast name} - {episode title}',
        podcastStatusEmoji: data.podcastStatusEmoji || ':microphone:',
        podcastPausedEmoji: data.podcastPausedEmoji || ':double_vertical_bar:',
      });
    }
  }
}
