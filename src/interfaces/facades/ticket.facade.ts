import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/app/ticket/ticket.service';
import { TicketStatus } from 'src/shared/const/enum.const';

@Injectable()
export class TicketFacade {
  constructor(private readonly ticketService: TicketService) {}

  async getTicketsByStatus(ticketStatus: TicketStatus) {
    return this.ticketService.getTicketsByStatus(ticketStatus);
  }

  async getAvailableDates() {
    return this.ticketService.getAvailableDates();
  }

  async getSeatsByTicket(ticketId: number) {
    return this.ticketService.getSeatsByTicket(ticketId);
  }
}
