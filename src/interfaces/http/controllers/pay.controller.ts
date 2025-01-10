import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { CreateTicketingDto } from 'src/app/pay/dto/create-ticketing.dto';
import { PayFacade } from 'src/interfaces/facades/pay.facade';

@ApiTags('PAY')
@Controller('pay')
export class PayController {
  constructor(private readonly payFacade: PayFacade) {}

  @Post()
  @ApiOperation({ summary: 'Make a payment for ticketing' })
  @ApiResponse({ status: 201, description: 'Payment processed successfully.' })
  @ApiResponse({ status: 404, description: 'User, seat, or ticket not found.' })
  @ApiResponse({ status: 400, description: 'Invalid payment data provided.' })
  @ApiResponse({ status: 403, description: 'Insufficient points to process payment.' })
  async pay(@Body() createPayHistoryDto: CreatePayHistoryDto) {
    return this.payFacade.pay(createPayHistoryDto);
  }

  @Post('ticketing')
  @ApiOperation({ summary: 'Ticketing operation' })
  @ApiResponse({ status: 201, description: 'Seat ticketing successfully.' })
  @ApiResponse({ status: 404, description: 'Seat or ticket not found.' })
  @ApiResponse({ status: 400, description: 'Invalid ticketing data provided.' })
  async ticketing(@Body() createTicketingDto: CreateTicketingDto) {
    return this.payFacade.ticketing(createTicketingDto);
  }

  @Get(':userId/history')
  @ApiOperation({ summary: 'Get payment history by user ID' })
  @ApiResponse({ status: 200, description: 'Payment history retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getPayHistoryByUser(@Param('userId') userId: string) {
    return this.payFacade.getPayHistoryByUser(userId);
  }
}
