/**
 * Type definitions for the session service.
 * @remarks
 * Defines interfaces and payloads related to interactive sessions, such as the emoji configuration session state.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
/**
 * Domain model for an emoji configuration session.
 *
 * @remarks
 * Represents the transient state required when a user is actively picking an emoji via Slack reactions, tracking the message and user involved.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * EmojiConfigSession([EmojiConfigSession])
 * ISessionRepository[ISessionRepository] -.->|Returns| EmojiConfigSession
 * ```
 *
 * @example
 * ```typescript
 * const session: EmojiConfigSession = { userId: 'U123', messageTs: '12345.67' };
 * ```
 *
 * @public
 */
export interface EmojiConfigSession {
  id: number;
  userId: string;
  channelId: string;
  messageTs: string;
  settingType: 'statusEmoji' | 'pausedEmoji' | 'podcastStatusEmoji' | 'podcastPausedEmoji';
}

/**
 * Data access interface for transient sessions.
 *
 * @remarks
 * Abstracts the persistence mechanism for temporary interactive workflows, such as multi-step Slack configuration prompts.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * ISessionRepository([ISessionRepository])
 * SessionRepository[SessionRepository] -->|Implements| ISessionRepository
 * CommandListenerService[CommandListenerService] -->|Uses| ISessionRepository
 * ```
 *
 * @example
 * ```typescript
 * await sessionRepo.createSession('U123', '123.45');
 * ```
 *
 * @public
 */
export interface ISessionRepository {
  createSession(session: Omit<EmojiConfigSession, 'id'>): Promise<EmojiConfigSession>;
  findActiveSessions(userId: string): Promise<EmojiConfigSession[]>;
  findByMessageTs(messageTs: string): Promise<EmojiConfigSession | null>;
  deleteSession(id: number): Promise<void>;
  deleteSessionsByMessageTs(messageTs: string[]): Promise<void>;
}
