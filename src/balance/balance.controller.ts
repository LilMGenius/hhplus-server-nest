import { Controller, Get, Post, Body } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getBalance() {
    return this.balanceService.getBalance();
  }

  @Post()
  chargeBalance(@Body() body: { amount: number }) {
    return this.balanceService.chargeBalance(body.amount);
  }
}
