import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, IsEnum } from 'class-validator';
import { TicketingStatus } from 'src/shared/const/enum.const';

export class CreateTicketingDto {
  @ApiProperty({ description: 'Associated seat ID' })
  @IsInt()
  seatId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Status of the ticketing', enum: TicketingStatus })
  @IsEnum(TicketingStatus)
  ticketingStatus: TicketingStatus;
}
