import { Sequelize } from 'sequelize-typescript';
import { AppConfig } from '../config';
import { UserModel } from './models/User';

let sequelizeInstance: Sequelize | null = null;

/**
 * Initializes and returns the Sequelize database connection.
 *
 * @param config - The application configuration containing DB credentials.
 * @returns The authenticated Sequelize instance.
 */
export function getDbConnection(config: AppConfig): Sequelize {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  sequelizeInstance = new Sequelize({
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.pass,
    database: config.db.name,
    storage: config.db.storage,
    logging: false, // Set to console.log to see SQL queries
    models: [UserModel],
  });

  return sequelizeInstance;
}
