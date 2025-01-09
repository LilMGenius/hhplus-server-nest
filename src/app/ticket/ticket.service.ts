import { Injectable } from '@nestjs/common';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { TicketStatus } from 'src/shared/const/enum.const';

@Injectable()
export class TicketService {
  constructor(
    private readonly ticketRepo: TicketRepo,
    private readonly seatRepo: SeatRepo,
  ) {}

  async getTicketsByStatus(ticketStatus: TicketStatus) {
    return this.ticketRepo.findByStatus(ticketStatus);
  }

  async getSeatsByTicket(ticketId: number) {
    return this.seatRepo.findByTicketId(ticketId);
  }
}
