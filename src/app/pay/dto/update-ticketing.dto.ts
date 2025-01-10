import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { TicketingStatus } from 'src/shared/const/enum.const';

export class UpdateTicketingDto {
  @ApiProperty({ description: 'Ticketing ID to update' })
  @IsInt()
  ticketingId: number;

  @ApiProperty({
    description: 'New status of the ticketing',
    enum: TicketingStatus,
  })
  @IsEnum(TicketingStatus)
  ticketingStatus: TicketingStatus;
}
