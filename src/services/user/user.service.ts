import { UserNotFoundError } from './errors';
import { User, IUserRepository, IUserService } from './types';

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
