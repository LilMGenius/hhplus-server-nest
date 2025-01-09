import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayController } from '../http/controllers/pay.controller';
import { PayFacade } from 'src/interfaces/facades/pay.facade';
import { PayService } from 'src/app/pay/pay.service';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticket } from '../entities/ticket.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { User } from 'src/interfaces/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing, PayHistory, Concert, Ticket, Seat, User])],
  controllers: [PayController],
  providers: [PayFacade, PayService, PayHistoryRepo, TicketingRepo, TicketRepo, SeatRepo, UserRepo],
  exports: [PayFacade],
})
export class PayModule {}
