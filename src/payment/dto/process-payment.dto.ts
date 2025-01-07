import { ApiProperty } from '@nestjs/swagger';

export class ProcessPaymentDto {
  @ApiProperty({ example: '12345', description: 'ID of the reserved ticket' })
  ticket_id: string;

  @ApiProperty({ example: 1, description: 'ID of the reserved seat' })
  seat_id: number;

  @ApiProperty({ example: '2025-01-23', description: 'Reservation date' })
  date: string;
}
