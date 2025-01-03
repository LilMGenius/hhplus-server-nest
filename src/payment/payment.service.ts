import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  processPayment({ ticket_id, seat_id, date }: { ticket_id: string; seat_id: number; date: string }) {
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
