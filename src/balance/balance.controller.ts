import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BalanceService } from './balance.service';

@ApiTags('Balance')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({ status: 200, description: 'Current balance of the user' })
  getBalance() {
    return this.balanceService.getBalance();
  }

  @Post()
  @ApiOperation({ summary: 'Charge user balance' })
  @ApiResponse({ status: 201, description: 'Balance successfully charged' })
  @ApiResponse({ status: 400, description: 'Invalid amount' })
  chargeBalance(@Body() body: { amount: number }) {
    return this.balanceService.chargeBalance(body.amount);
  }
}
