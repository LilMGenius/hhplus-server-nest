import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, IsEnum } from 'class-validator';

export class CreateTicketingDto {
  @ApiProperty({ description: 'Associated seat ID' })
  @IsInt()
  seatId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Status of the ticketing', enum: ['PENDING', 'PAID', 'REVOKE'] })
  @IsEnum(['PENDING', 'PAID', 'REVOKE'])
  ticketingStatus: 'PENDING' | 'PAID' | 'REVOKE';
}
