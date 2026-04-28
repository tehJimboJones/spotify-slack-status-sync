import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { EmojiConfigSession } from '../../services/session/types';

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
