import { Injectable } from '@nestjs/common';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class PaymentService {
  processPayment({ ticket_id, seat_id, date }: ProcessPaymentDto) {
    return {
      status: 'success',
      receipt: {
        payment_id: '12345',
        amount: 50,
        date: new Date().toISOString(),
      },
    };
  }
}
