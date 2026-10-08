/**
 * Sequelize model for acronym configuration settings.
 * @remarks
 * Defines the schema and data access patterns for persisting acronym guessing behavior and channel subscriptions.
 *
 * @author jmaciejewski
 * @date   2026-10-08
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';
import { AcronymConfig } from '../../services/acronym/types';

/**
 * Sequelize ORM model mapping to the acronym_configs table.
 *
 * @public
 */
@Table({
  tableName: 'acronym_configs',
  timestamps: true,
})
export class AcronymConfigModel extends Model<AcronymConfigModel> implements AcronymConfig {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare isEnabled: boolean;

  @Default('[]')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('channels');
      if (!rawValue) return [];
      try {
        return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[]) {
      this.setDataValue('channels', JSON.stringify(val || []) as unknown as string[]);
    },
  })
  declare channels: string[];

  @Default('[]')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('enabledAcronyms');
      if (!rawValue) return [];
      try {
        return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      } catch {
        return [];
      }
    },
    set(val: string[]) {
      this.setDataValue('enabledAcronyms', JSON.stringify(val || []) as unknown as string[]);
    },
  })
  declare enabledAcronyms: string[];
}
