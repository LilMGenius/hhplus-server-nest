import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  processPayment(@Body() body: { ticket_id: string; seat_id: number; date: string }) {
    return this.paymentService.processPayment(body);
  }
}
