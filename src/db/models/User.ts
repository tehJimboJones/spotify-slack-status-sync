/**
 * Sequelize model for user accounts.
 * @remarks
 * Defines the schema for application users, persisting their Slack identities, Spotify credentials, and synchronization preferences.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
import { User } from '../../services/user/types';

/**
 * Sequelize ORM model mapping to the users table.
 *
 * @remarks
 * Defines the database schema and Active Record methods for User entities, mapping directly to underlying database columns.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * UserModel([UserModel]) -->|Extends| Model[Sequelize Model]
 * UserModel -->|Implements| User[User]
 * SequelizeUserRepository[SequelizeUserRepository] -->|Uses| UserModel
 * ```
 *
 * @example
 * ```typescript
 * const user = await UserModel.findOne({ where: { slackId: 'U123' } });
 * ```
 *
 * @public
 */
@Table({
  tableName: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt
})
export class UserModel extends Model<UserModel> implements User {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare slackUserId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare slackUserToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare spotifyRefreshToken: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare isSyncActive: boolean;

  @Default('{song} - {artist}')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare statusFormat: string;

  @Default(':headphones:')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare statusEmoji: string;

  @Default(':double_vertical_bar:')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare pausedEmoji: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare syncPodcasts: boolean;

  @Default('{podcast name} - {episode title}')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare podcastStatusFormat: string;

  @Default(':microphone:')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare podcastStatusEmoji: string;

  @Default(':double_vertical_bar:')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare podcastPausedEmoji: string;
}
