import { ApiProperty } from '@nestjs/swagger';

export class RespondPaymentDto {
  @ApiProperty({ example: 'success', description: 'Payment status' })
  status: string;

  @ApiProperty({
    example: {
      payment_id: '12345',
      amount: 50,
      date: '2025-01-23T12:00:00Z',
    },
    description: 'Payment receipt details',
  })
  receipt: {
    payment_id: string;
    amount: number;
    date: string;
  };
}
