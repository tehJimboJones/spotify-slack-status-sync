import { IUserRepository, User } from '../../user';
import { UserModel } from '../models/User';

/**
 * Sequelize implementation of the User repository.
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
