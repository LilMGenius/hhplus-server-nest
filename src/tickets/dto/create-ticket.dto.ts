import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({ example: '2025-01-23', description: 'Date of the ticket' })
  date: string;

  @ApiProperty({ example: 1, description: 'ID of the seat' })
  seat_id: number;
}
