/**
 * Repository for managing temporary interactive sessions.
 * @remarks
 * Provides data access methods for creating and retrieving session data, primarily used for multi-step Slack UI workflows.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { EmojiConfigSession, ISessionRepository } from './types';
import { EmojiConfigSessionModel } from '../../db/models/EmojiConfigSession';

/**
 * Concrete repository for managing sessions.
 *
 * @remarks
 * Provides data access for transient session state utilizing the Sequelize ORM and the EmojiConfigSessionModel.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SessionRepository([SessionRepository]) -->|Implements| ISessionRepository[ISessionRepository]
 * SessionRepository -->|Uses| EmojiConfigSessionModel[EmojiConfigSessionModel]
 * Client[App Bootstrap] -.->|Instantiates| SessionRepository
 * ```
 *
 * @example
 * ```typescript
 * const sessionRepo = new SessionRepository();
 * ```
 *
 * @public
 */
export class SessionRepository implements ISessionRepository {
  public async createSession(session: Omit<EmojiConfigSession, 'id'>): Promise<EmojiConfigSession> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const createdSession = await EmojiConfigSessionModel.create(session as any);
    return createdSession.toJSON() as EmojiConfigSession;
  }

  public async findActiveSessions(userId: string): Promise<EmojiConfigSession[]> {
    const sessions = await EmojiConfigSessionModel.findAll({
      where: { userId },
    });
    return sessions.map((session) => session.toJSON() as EmojiConfigSession);
  }

  public async findByMessageTs(messageTs: string): Promise<EmojiConfigSession | null> {
    const session = await EmojiConfigSessionModel.findOne({
      where: { messageTs },
    });
    return session ? (session.toJSON() as EmojiConfigSession) : null;
  }

  public async deleteSession(id: number): Promise<void> {
    await EmojiConfigSessionModel.destroy({
      where: { id },
    });
  }

  public async deleteSessionsByMessageTs(messageTsList: string[]): Promise<void> {
    if (messageTsList.length === 0) return;
    await EmojiConfigSessionModel.destroy({
      where: { messageTs: messageTsList },
    });
  }
}
