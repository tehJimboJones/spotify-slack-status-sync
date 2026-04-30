/**
 * Sequelize model for emoji configuration sessions.
 * @remarks
 * Defines the schema and data access patterns for tracking temporary sessions during the Slack emoji configuration workflow.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { EmojiConfigSession } from '../../services/session/types';

/**
 * Sequelize ORM model for transient emoji sessions.
 *
 * @remarks
 * Defines the schema for temporarily storing message states while users configure their emoji preferences interactively.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * EmojiConfigSessionModel([EmojiConfigSessionModel]) -->|Extends| Model[Sequelize Model]
 * EmojiConfigSessionModel -->|Implements| EmojiConfigSession[EmojiConfigSession]
 * SessionRepository[SessionRepository] -->|Uses| EmojiConfigSessionModel
 * ```
 *
 * @example
 * ```typescript
 * const session = await EmojiConfigSessionModel.create({ userId: 'U123', messageTs: '123' });
 * ```
 *
 * @public
 */
@Table({
  tableName: 'emoji_config_sessions',
  timestamps: true, // Automatically adds createdAt and updatedAt
  updatedAt: false, // We only need createdAt based on the migration
})
export class EmojiConfigSessionModel
  extends Model<EmojiConfigSessionModel>
  implements EmojiConfigSession
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare channelId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare messageTs: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare settingType: 'statusEmoji' | 'pausedEmoji' | 'podcastStatusEmoji' | 'podcastPausedEmoji';
}
