import { UserService, IUserRepository, User } from '../src/user';
import { UserNotFoundError } from '../src/errors';

describe('UserService', () => {
  let mockRepository: jest.Mocked<IUserRepository>;
  let service: UserService;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      findBySlackId: jest.fn(),
      update: jest.fn().mockResolvedValue(undefined),
      findAll: jest.fn(),
      create: jest.fn(),
    };

    service = new UserService(mockRepository);
  });

  it('should return only active users', async () => {
    const mockUsers: User[] = [
      { id: '1', slackUserId: 'U1', isSyncActive: true } as User,
      { id: '2', slackUserId: 'U2', isSyncActive: false } as User,
      { id: '3', slackUserId: 'U3', isSyncActive: true } as User,
    ];

    mockRepository.findAll.mockResolvedValue(mockUsers);

    const activeUsers = await service.getActiveUsers();

    expect(activeUsers).toHaveLength(2);
    expect(activeUsers.map((u) => u.slackUserId)).toEqual(['U1', 'U3']);
  });

  it('should toggle user sync state', async () => {
    mockRepository.findBySlackId.mockResolvedValue({ id: '1', slackUserId: 'U1' } as User);

    await service.toggleUserSync('U1', false);

    expect(mockRepository.findBySlackId).toHaveBeenCalledWith('U1');
    expect(mockRepository.update).toHaveBeenCalledWith('U1', { isSyncActive: false });
  });

  it('should throw UserNotFoundError if user is not found during toggle', async () => {
    mockRepository.findBySlackId.mockResolvedValue(null);

    await expect(service.toggleUserSync('UNKNOWN', false)).rejects.toThrow(UserNotFoundError);
    expect(mockRepository.findBySlackId).toHaveBeenCalledWith('UNKNOWN');
    expect(mockRepository.update).not.toHaveBeenCalled();
  });

  it('should throw UserNotFoundError if user is not found during getUser', async () => {
    mockRepository.findBySlackId.mockResolvedValue(null);

    await expect(service.getUser('UNKNOWN')).rejects.toThrow(UserNotFoundError);
  });
});
