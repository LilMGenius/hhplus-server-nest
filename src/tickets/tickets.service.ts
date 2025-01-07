import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketsService {
  getAvailableDates() {
    return ['2025-01-23', '2025-01-24'];
  }

  reserveSeat({ date, seat_id }: { date: string; seat_id: number }) {
    return { status: 'reserved', expiration: new Date().toISOString() };
  }
}
