import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/interfaces/http/middlewares/logger/logger.module';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayController } from 'src/interfaces/http/controllers/pay.controller';
import { PayFacade } from 'src/interfaces/facades/pay.facade';
import { PayService } from 'src/app/pay/pay.service';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { ConcertRepo } from 'src/interfaces/repo/concert.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { User } from 'src/interfaces/entities/user.entity';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([PayHistory, Ticketing, Concert, Ticket, Seat, User]),
  ],
  controllers: [PayController],
  providers: [
    LoggerService,
    PayFacade,
    PayService,
    PayHistoryRepo,
    TicketingRepo,
    ConcertRepo,
    TicketRepo,
    SeatRepo,
    UserRepo,
  ],
  exports: [PayFacade],
})
export class PayModule {}
