import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
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

  @ApiProperty({ description: 'Revokation date of the ticketing', required: false })
  @IsDate()
  @IsOptional()
  revokedAt?: Date;
}
