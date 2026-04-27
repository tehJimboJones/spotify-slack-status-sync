import { AppConfig } from './config';
import { UserNotFoundError } from './errors';

/**
 * Represents a user of the Spotify Status Bot.
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
}

/**
 * Interface defining the operations for interacting with User persistence.
 */
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findBySlackId(slackId: string): Promise<User | null>;
  update(slackId: string, data: Partial<User>): Promise<void>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

/**
 * A mock repository that seeds a single user from the AppConfig.
 * Used during Phase 1 transition before introducing the database.
 */
export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  constructor(config: AppConfig) {
    // Seed the mock repository with the single user from the .env configuration
    this.users.push({
      id: 'mock-uuid-1',
      slackUserId: 'U_MOCK_USER', // Used for testing/mocking
      slackUserToken: config.slack.userToken,
      spotifyRefreshToken: config.spotify.refreshToken || '',
      isSyncActive: true,
      statusFormat: config.bot.statusFormat,
      statusEmoji: config.bot.statusEmoji,
      pausedEmoji: config.bot.pausedEmoji,
    });
  }

  public async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  public async findBySlackId(slackId: string): Promise<User | null> {
    return this.users.find((u) => u.slackUserId === slackId) || null;
  }

  public async update(slackId: string, data: Partial<User>): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.slackUserId === slackId);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...data };
    }
  }

  public async findAll(): Promise<User[]> {
    return [...this.users];
  }

  public async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { ...user, id: `mock-uuid-${Date.now()}` };
    this.users.push(newUser);
    return newUser;
  }
}

/**
 * Interface defining the business logic layer for Users.
 */
export interface IUserService {
  getUser(slackId: string): Promise<User>;
  getActiveUsers(): Promise<User[]>;
  toggleUserSync(slackId: string, isSyncActive: boolean): Promise<void>;
  upsertUser(slackId: string, data: Partial<User>): Promise<void>;
}

/**
 * Service encapsulating business logic for User operations.
 */
export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Retrieves a specific user by their Slack ID.
   * @throws {UserNotFoundError} if the user is not found.
   */
  public async getUser(slackId: string): Promise<User> {
    const user = await this.userRepository.findBySlackId(slackId);
    if (!user) {
      throw new UserNotFoundError(`User with Slack ID ${slackId} not found.`);
    }
    return user;
  }

  /**
   * Retrieves all users who currently have background sync enabled.
   */
  public async getActiveUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.filter((u) => u.isSyncActive);
  }

  /**
   * Toggles the background sync status for a given user.
   * @throws {UserNotFoundError} if the user is not found.
   */
  public async toggleUserSync(slackId: string, isSyncActive: boolean): Promise<void> {
    const user = await this.userRepository.findBySlackId(slackId);
    if (user) {
      await this.userRepository.update(slackId, { isSyncActive });
    } else {
      throw new UserNotFoundError(`User with Slack ID ${slackId} not found.`);
    }
  }

  /**
   * Creates or updates a user.
   */
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
      });
    }
  }
}
