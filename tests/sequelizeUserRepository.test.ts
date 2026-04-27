import { Sequelize } from 'sequelize-typescript';
import { SequelizeUserRepository } from '../src/db/repositories/UserRepository';
import { UserModel } from '../src/db/models/User';

describe('SequelizeUserRepository', () => {
  let sequelize: Sequelize;
  let repository: SequelizeUserRepository;

  beforeAll(async () => {
    // Setup in-memory SQLite database for testing
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [UserModel],
    });

    // Sync the database (creates tables)
    await sequelize.sync({ force: true });
    repository = new SequelizeUserRepository();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  afterEach(async () => {
    // Clean up data between tests
    await UserModel.destroy({ where: {}, truncate: true });
  });

  it('should create and find a user by ID', async () => {
    const createdUser = await repository.create({
      slackUserId: 'U_TEST',
      slackUserToken: 'xoxp-test',
      spotifyRefreshToken: 'spotify-refresh',
      isSyncActive: true,
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });

    expect(createdUser.id).toBeDefined();

    const foundUser = await repository.findById(createdUser.id);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.slackUserId).toBe('U_TEST');
    expect(foundUser?.syncPodcasts).toBe(false);
    expect(foundUser?.podcastStatusFormat).toBe('{podcast name} - {episode title}');
    expect(foundUser?.podcastStatusEmoji).toBe(':microphone:');
    expect(foundUser?.podcastPausedEmoji).toBe(':double_vertical_bar:');
  });

  it('should find a user by Slack ID', async () => {
    await repository.create({
      slackUserId: 'U_SLACK',
      slackUserToken: 'xoxp-test',
      spotifyRefreshToken: 'spotify-refresh',
      isSyncActive: true,
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });

    const foundUser = await repository.findBySlackId('U_SLACK');
    expect(foundUser).not.toBeNull();
    expect(foundUser?.slackUserToken).toBe('xoxp-test');
  });

  it('should update a user', async () => {
    await repository.create({
      slackUserId: 'U_UPDATE',
      slackUserToken: 'xoxp-test',
      spotifyRefreshToken: 'spotify-refresh',
      isSyncActive: true,
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });

    await repository.update('U_UPDATE', { isSyncActive: false });

    const updatedUser = await repository.findBySlackId('U_UPDATE');
    expect(updatedUser?.isSyncActive).toBe(false);
  });

  it('should find all users', async () => {
    await repository.create({
      slackUserId: 'U_ALL_1',
      slackUserToken: 'test1',
      spotifyRefreshToken: 'refresh1',
      isSyncActive: true,
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });

    await repository.create({
      slackUserId: 'U_ALL_2',
      slackUserToken: 'test2',
      spotifyRefreshToken: 'refresh2',
      isSyncActive: false,
      statusFormat: '{song}',
      statusEmoji: ':emoji:',
      pausedEmoji: ':pause:',
      syncPodcasts: false,
      podcastStatusFormat: '{podcast name} - {episode title}',
      podcastStatusEmoji: ':microphone:',
      podcastPausedEmoji: ':double_vertical_bar:',
    });

    const users = await repository.findAll();
    expect(users).toHaveLength(2);
  });
});
