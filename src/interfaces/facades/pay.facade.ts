import { Injectable } from '@nestjs/common';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { CreateTicketingDto } from 'src/app/pay/dto/create-ticketing.dto';
import { PayService } from 'src/app/pay/pay.service';

@Injectable()
export class PayFacade {
  constructor(private readonly payService: PayService) {}

  async pay(createPayHistoryDto: CreatePayHistoryDto) {
    return this.payService.pay(createPayHistoryDto);
  }

  async ticketing(createTicketingDto: CreateTicketingDto) {
    return this.payService.ticketing(createTicketingDto);
  }

  async getPayHistoryByUser(userId: string) {
    return this.payService.getPayHistoryByUser(userId);
  }
}
