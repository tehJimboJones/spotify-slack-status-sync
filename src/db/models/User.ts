import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
import { User } from '../../user';

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
