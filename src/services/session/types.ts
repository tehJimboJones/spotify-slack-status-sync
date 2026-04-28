export interface EmojiConfigSession {
  id: number;
  userId: string;
  channelId: string;
  messageTs: string;
  settingType: 'statusEmoji' | 'pausedEmoji' | 'podcastStatusEmoji' | 'podcastPausedEmoji';
}

export interface ISessionRepository {
  createSession(session: Omit<EmojiConfigSession, 'id'>): Promise<EmojiConfigSession>;
  findActiveSessions(userId: string): Promise<EmojiConfigSession[]>;
  findByMessageTs(messageTs: string): Promise<EmojiConfigSession | null>;
  deleteSession(id: number): Promise<void>;
  deleteSessionsByMessageTs(messageTs: string[]): Promise<void>;
}
