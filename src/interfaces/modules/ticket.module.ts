import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '../http/controllers/ticket.controller';
import { TicketFacade } from 'src/interfaces/facades/ticket.facade';
import { TicketService } from 'src/app/ticket/ticket.service';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert, Ticket, Seat])],
  controllers: [TicketController],
  providers: [TicketFacade, TicketService, TicketRepo, SeatRepo],
  exports: [TicketFacade],
})
export class TicketModule {}
