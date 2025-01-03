import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('dates')
  getAvailableDates() {
    return this.ticketsService.getAvailableDates();
  }

  @Post()
  reserveSeat(@Body() body: { date: string; seat_id: number }) {
    return this.ticketsService.reserveSeat(body);
  }
}
