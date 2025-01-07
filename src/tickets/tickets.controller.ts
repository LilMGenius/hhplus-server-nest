import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('dates')
  @ApiOperation({ summary: 'Get available dates of the ticket' })
  @ApiResponse({ status: 200, description: 'List of available dates' })
  getAvailableDates() {
    return this.ticketsService.getAvailableDates();
  }

  @Post()
  @ApiOperation({ summary: 'Reserve a seat' })
  @ApiResponse({ status: 201, description: 'Seat successfully reserved' })
  @ApiResponse({ status: 400, description: 'Invalid date or seat ID' })
  reserveSeat(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.reserveSeat(createTicketDto);
  }
}
