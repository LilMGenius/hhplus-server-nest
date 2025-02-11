import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TicketFacade } from 'src/interfaces/facades/ticket.facade';
import { TicketStatus } from 'src/shared/const/enum.const';

@ApiTags('TICKET')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketFacade: TicketFacade) {}

  @Get(':status')
  @ApiOperation({ summary: 'Get tickets by status' })
  @ApiResponse({ status: 200, description: 'Tickets retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid ticket status provided.' })
  async getTicketsByStatus(@Param('status') ticketStatus: TicketStatus) {
    return this.ticketFacade.getTicketsByStatus(ticketStatus);
  }

  @Get('seat/:ticketId')
  @ApiOperation({ summary: 'Get seats for a ticket' })
  @ApiResponse({ status: 200, description: 'Seats retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Ticket or seats not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ticket ID provided.' })
  async getSeatsByTicket(@Param('ticketId') ticketId: number) {
    return this.ticketFacade.getSeatsByTicket(ticketId);
  }

  @Get('dates')
  @ApiOperation({ summary: 'Get all available dates for OPEN tickets' })
  @ApiResponse({ status: 200, description: 'Available dates retrieved successfully.' })
  async getAvailableDates() {
    return this.ticketFacade.getAvailableDates();
  }
}
