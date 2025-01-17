import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/interfaces/http/middlewares/logger/logger.module';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { TicketController } from 'src/interfaces/http/controllers/ticket.controller';
import { TicketFacade } from 'src/interfaces/facades/ticket.facade';
import { TicketService } from 'src/app/ticket/ticket.service';
import { ConcertRepo } from 'src/interfaces/repo/concert.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { SeatScheduler } from 'src/interfaces/schedulers/seat.scheduler';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Concert, Ticket, Seat])],
  controllers: [TicketController],
  providers: [
    LoggerService,
    TicketFacade,
    TicketService,
    ConcertRepo,
    TicketRepo,
    SeatRepo,
    SeatScheduler,
  ],
  exports: [TicketFacade],
})
export class TicketModule {}
