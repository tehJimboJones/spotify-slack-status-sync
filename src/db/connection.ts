/**
 * Database connection and ORM configuration.
 * @remarks
 * Initializes the Sequelize instance, registers models, and manages the lifecycle of the application's database connection.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { Sequelize } from 'sequelize-typescript';
import { IConfigService } from '../services/config/types';
import { UserModel } from './models/User';
import { EmojiConfigSessionModel } from './models/EmojiConfigSession';

let sequelizeInstance: Sequelize | null = null;

/**
 * Initializes and returns the Sequelize database connection.
 *
 * @param configService - The application configuration containing DB credentials.
 * @returns The authenticated Sequelize instance.
 */
export function getDbConnection(configService: IConfigService): Sequelize {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  const dbConfig = configService.getDbConfig();

  sequelizeInstance = new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.pass,
    database: dbConfig.name,
    storage: dbConfig.storage,
    logging: false, // Set to console.log to see SQL queries
    models: [UserModel, EmojiConfigSessionModel],
  });

  return sequelizeInstance;
}
