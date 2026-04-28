import { IConfigService } from '../config/types';
import { User, IUserRepository } from './types';

export class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  constructor(configService: IConfigService) {
    this.users.push({
      id: 'mock-uuid-1',
      slackUserId: 'U_MOCK_USER',
      slackUserToken: configService.getSlackConfig().userToken,
      spotifyRefreshToken: configService.getSpotifyConfig().refreshToken || '',
      isSyncActive: true,
      statusFormat: configService.getBotConfig().statusFormat,
      statusEmoji: configService.getBotConfig().statusEmoji,
      pausedEmoji: configService.getBotConfig().pausedEmoji,
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
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
