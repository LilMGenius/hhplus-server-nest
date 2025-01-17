import { Injectable } from '@nestjs/common';
import { Repository, LessThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'src/interfaces/entities/queue.entity';
import { QueueStatus } from 'src/shared/const/enum.const';
import { CreateQueueDto } from 'src/app/user/dto/create-queue.dto';
import { UpdateQueueDto } from 'src/app/user/dto/update-queue.dto';

@Injectable()
export class QueueRepo {
  constructor(
    @InjectRepository(Queue)
    private readonly repo: Repository<Queue>,
  ) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const newQueue = this.repo.create(createQueueDto);
    return this.repo.save(newQueue);
  }

  async update(updateQueueDto: UpdateQueueDto): Promise<Queue> {
    const queue = await this.findByUserId(updateQueueDto.userId);
    if (!queue) {
      throw new Error('Queue not found');
    }

    queue.queueStatus = updateQueueDto.queueStatus;
    return this.repo.save(queue);
  }

  async findByUserId(userId: string): Promise<Queue | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repo.delete({ userId });
  }

  async findWaitQueues(limit: number): Promise<Queue[]> {
    return this.repo.find({
      where: { queueStatus: QueueStatus.WAIT },
      take: limit,
    });
  }

  async findExpiredQueues(now: Date): Promise<Queue[]> {
    return this.repo.find({
      where: {
        expiredAt: LessThanOrEqual(now),
      },
    });
  }
}
