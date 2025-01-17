import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { QueueStatus } from 'src/shared/const/enum.const';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepo: UserRepo,
    private readonly queueRepo: QueueRepo,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepo.create({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.update(updateUserDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getPoint(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return user.point;
  }

  async createQueue(userId: string) {
    const existingQueue = await this.queueRepo.findByUserId(userId);
    if (existingQueue && existingQueue.queueStatus !== QueueStatus.EXPIRY) {
      throw new Error('User already in a queue.');
    }

    const newQueue = {
      userId,
      queueStatus: QueueStatus.WAIT,
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    };
    return this.queueRepo.create(newQueue);
  }

  async getQueueStatus(userId: string) {
    const queue = await this.queueRepo.findByUserId(userId);
    return queue?.queueStatus ?? QueueStatus.EXPIRY;
  }

  async clearQueue(userId: string) {
    return this.queueRepo.deleteByUserId(userId);
  }

  async activateWaitQueues() {
    const limit = 100; // 100 queues per activation
    const waitQueues = await this.queueRepo.findWaitQueues(limit);

    for (const queue of waitQueues) {
      await this.queueRepo.update({ userId: queue.userId, queueStatus: QueueStatus.ACTIVE });
    }

    return waitQueues.length;
  }

  async removeExpiredQueues() {
    const now = new Date();
    const expiredQueues = await this.queueRepo.findExpiredQueues(now);

    for (const queue of expiredQueues) {
      await this.clearQueue(queue.userId);
    }

    return expiredQueues.length;
  }
}
