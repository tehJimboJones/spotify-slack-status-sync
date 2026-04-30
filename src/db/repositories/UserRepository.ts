/**
 * Data access repository for User entities.
 * @remarks
 * Abstracts direct database access for the User model, providing an interface for creating, retrieving, and updating user records.
 *
 * @author jmaciejewski
 * @date   2026-04-29
 * @copyright (c) 2026 Spotify Status Bot. All rights reserved.
 *
 * @packageDocumentation
 */
import { IUserRepository, User } from '../../services/user/types';
import { UserModel } from '../models/User';

/**
 * Sequelize implementation of the User repository.
 */
/**
 * Sequelize-based implementation of the User repository.
 *
 * @remarks
 * Implements the IUserRepository contract using Sequelize models to persist and retrieve User entities in a relational database.
 *
 * ### Relationships
 * ```mermaid
 * graph TD
 * SequelizeUserRepository([SequelizeUserRepository]) -->|Implements| IUserRepository[IUserRepository]
 * SequelizeUserRepository -->|Uses| UserModel[UserModel]
 * Client[App Bootstrap] -.->|Instantiates| SequelizeUserRepository
 * ```
 *
 * @example
 * ```typescript
 * const userRepository = new SequelizeUserRepository();
 * ```
 *
 * @public
 */
export class SequelizeUserRepository implements IUserRepository {
  public async findById(id: string): Promise<User | null> {
    const model = await UserModel.findByPk(id);
    return model ? (model.toJSON() as User) : null;
  }

  public async findBySlackId(slackId: string): Promise<User | null> {
    const model = await UserModel.findOne({ where: { slackUserId: slackId } });
    return model ? (model.toJSON() as User) : null;
  }

  public async update(slackId: string, data: Partial<User>): Promise<void> {
    await UserModel.update(data, { where: { slackUserId: slackId } });
  }

  public async findAll(): Promise<User[]> {
    const models = await UserModel.findAll();
    return models.map((m) => m.toJSON() as User);
  }

  /**
   * Helper method for tests/admin to create users since we removed create() from interface
   * to align with Phase 1 constraints.
   */
  public async create(user: Omit<User, 'id'>): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = await UserModel.create(user as any);
    return model.toJSON() as User;
  }
}
