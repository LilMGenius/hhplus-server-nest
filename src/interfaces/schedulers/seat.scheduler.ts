import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { TicketFacade } from 'src/interfaces/facades/ticket.facade';

@Injectable()
export class SeatScheduler {
  constructor(
    private readonly logger: LoggerService,
    private readonly facade: TicketFacade,
  ) {}

  @Cron('*/30 * * * * *') // Every 30 seconds
  async onReleaseExpiredSeats() {
    const length = await this.facade.releaseExpiredSeats();
    this.logger.info(`${length} expired seats released.`);
  }
}
