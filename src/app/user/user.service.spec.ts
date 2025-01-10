import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { QueueStatus } from 'src/shared/const/enum.const';
import { v4 as uuidv4 } from 'uuid';

describe('UserService', () => {
  let service: UserService;
  let userRepo: Partial<UserRepo>;
  let queueRepo: Partial<QueueRepo>;

  beforeEach(async () => {
    userRepo = {
      create: jest.fn().mockResolvedValue({
        userId: uuidv4(),
        userName: 'Seonmin Lee',
        point: 0,
        createdAt: new Date(),
      }),
      findById: jest.fn().mockResolvedValue({
        userId: uuidv4(),
        userName: 'Seonmin Lee',
        point: 100,
        createdAt: new Date(),
      }),
      update: jest.fn().mockResolvedValue({
        userId: uuidv4(),
        point: 150,
      }),
    };

    queueRepo = {
      create: jest.fn().mockResolvedValue({
        queueId: 1,
        userId: uuidv4(),
        queueStatus: QueueStatus.WAIT,
        createdAt: new Date(),
        expiredAt: new Date(Date.now() + 10 * 60 * 1000),
      }),
      findByUserId: jest.fn().mockResolvedValue(null),
      deleteByUserId: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepo, useValue: userRepo },
        { provide: QueueRepo, useValue: queueRepo },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // User tests
  it('should create a new user', async () => {
    const userId = uuidv4();
    const dto = { userName: 'Seonmin Lee' };
    const result = await service.createUser(dto);

    expect(userRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ userName: 'Seonmin Lee', createdAt: expect.any(Date) }),
    );
    expect(result.userName).toBe('Seonmin Lee');
  });

  it('should retrieve user points', async () => {
    const userId = uuidv4();
    const result = await service.getPoint(userId);

    expect(userRepo.findById).toHaveBeenCalledWith(userId);
    expect(result).toBe(100);
  });

  it('should update user points', async () => {
    const userId = uuidv4();
    const dto = { point: 150 };
    const result = await service.updatePoint(userId, dto);

    expect(userRepo.findById).toHaveBeenCalledWith(userId);
    expect(result).toBe(150);
  });

  it('should update user info', async () => {
    const userId = uuidv4();
    const dto = { userName: 'Jini Hwang' };
    const result = await service.updateUser(userId, dto);

    expect(userRepo.update).toHaveBeenCalledWith(userId, dto);
    expect(result.userName).toBeUndefined();
  });

  // Queue tests
  it('should create a queue for a user', async () => {
    const userId = uuidv4();
    const result = await service.createQueue(userId);

    expect(queueRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId,
        queueStatus: QueueStatus.WAIT,
        createdAt: expect.any(Date),
        expiredAt: expect.any(Date),
      }),
    );
    expect(result.queueStatus).toBe(QueueStatus.WAIT);
  });

  it('should retrieve the queue status', async () => {
    const userId = uuidv4();
    const queue = {
      queueId: 1,
      userId,
      queueStatus: QueueStatus.ACTIVE,
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 10 * 60 * 1000),
    };
    jest.spyOn(queueRepo, 'findByUserId').mockResolvedValueOnce(queue);

    const result = await service.getQueueStatus(userId);

    expect(queueRepo.findByUserId).toHaveBeenCalledWith(userId);
    expect(result.queueStatus).toBe(QueueStatus.ACTIVE);
  });

  it('should clear the user queue', async () => {
    const userId = uuidv4();
    await service.clearQueue(userId);

    expect(queueRepo.deleteByUserId).toHaveBeenCalledWith(userId);
  });

  // Concurrency test
  it('should handle concurrent queue creation gracefully', async () => {
    const userId = uuidv4();

    jest.spyOn(queueRepo, 'findByUserId').mockImplementation(async () => {
      // Simulate an existing queue check under concurrency
      return Math.random() > 0.5
        ? null
        : {
            queueId: 1,
            userId,
            queueStatus: QueueStatus.WAIT,
            createdAt: new Date(),
            expiredAt: new Date(Date.now() + 10 * 60 * 1000),
          };
    });

    const results = await Promise.allSettled([
      service.createQueue(userId),
      service.createQueue(userId),
    ]);

    const successfulCreations = results.filter((result) => result.status === 'fulfilled');
    const failedCreations = results.filter((result) => result.status === 'rejected');

    expect(successfulCreations.length + failedCreations.length).toBe(2);
    expect(failedCreations[0]?.reason.message).toBe('User is already in the queue');
  });
});
