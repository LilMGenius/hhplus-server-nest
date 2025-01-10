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

  async getAvailableDates() {
    const tickets = await this.ticketRepo.findByStatus(TicketStatus.OPEN);
    const now = new Date();

    const availableDates = new Set<string>();

    for (const ticket of tickets) {
      const startDate = ticket.openedAt > now ? ticket.openedAt : now;
      const endDate = ticket.closedAt;

      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        availableDates.add(date.toISOString().split('T')[0]);
      }
    }

    return Array.from(availableDates).sort();
  }
}
