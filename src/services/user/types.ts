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

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findBySlackId(slackId: string): Promise<User | null>;
  update(slackId: string, data: Partial<User>): Promise<void>;
  findAll(): Promise<User[]>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

export interface IUserService {
  getUser(slackId: string): Promise<User>;
  getActiveUsers(): Promise<User[]>;
  toggleUserSync(slackId: string, isSyncActive: boolean): Promise<void>;
  upsertUser(slackId: string, data: Partial<User>): Promise<void>;
}
