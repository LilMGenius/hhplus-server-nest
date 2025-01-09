import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'src/interfaces/entities/queue.entity';

@Injectable()
export class QueueRepo {
  constructor(
    @InjectRepository(Queue)
    private readonly repo: Repository<Queue>,
  ) {}

  async create(queue: Partial<Queue>): Promise<Queue> {
    const newQueue = this.repo.create(queue);
    return this.repo.save(newQueue);
  }

  async findByUserId(userId: string): Promise<Queue | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repo.delete({ userId });
  }
}
