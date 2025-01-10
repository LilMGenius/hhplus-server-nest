import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UpdateQueueDto } from 'src/app/user/dto/update-queue.dto';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { QueueStatus } from 'src/shared/const/enum.const';

@Injectable()
export class QueueScheduler {
  constructor(private readonly queueRepo: QueueRepo) {}

  @Cron('*/30 * * * * *') // Every 30 seconds
  async activateWaitQueues() {
    const limit = 100; // 100 queues per activation
    const waitQueues = await this.queueRepo.findWaitQueues(limit);

    for (const queue of waitQueues) {
      const updateQueueDto: UpdateQueueDto = {
        userId: queue.userId,
        queueStatus: QueueStatus.ACTIVE,
      };
      await this.queueRepo.update(updateQueueDto);
    }

    console.log(`${waitQueues.length} queues activated.`);
  }

  @Cron('*/30 * * * *') // Every 30 minutes
  async removeExpiredQueues() {
    const now = new Date();
    const expiredQueues = await this.queueRepo.findExpiredQueues(now);

    for (const queue of expiredQueues) {
      await this.queueRepo.deleteByUserId(queue.userId);
    }

    console.log(`${expiredQueues.length} expired queues deleted.`);
  }
}
