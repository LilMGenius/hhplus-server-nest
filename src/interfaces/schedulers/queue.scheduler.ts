import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { UserFacade } from 'src/interfaces/facades/user.facade';

@Injectable()
export class QueueScheduler {
  constructor(
    private readonly logger: LoggerService,
    private readonly facade: UserFacade,
  ) {}

  @Cron('*/3 * * * * *') // Every 3 seconds
  async onActivateWaitQueues() {
    const length = await this.facade.activateWaitQueues();
    this.logger.info(`${length} wait queues activated.`);
  }

  @Cron('*/30 * * * * *') // Every 30 seconds
  async onRemoveExpiredQueues() {
    const length = await this.facade.removeExpiredQueues();
    this.logger.info(`${length} expired queues removed.`);
  }
}
