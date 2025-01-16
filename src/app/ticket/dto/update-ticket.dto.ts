import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, IsDate } from 'class-validator';
import { TicketStatus } from 'src/shared/const/enum.const';

export class UpdateTicketDto {
  @ApiProperty({ description: 'Ticket ID to update' })
  @IsInt()
  ticketId: number;

  @ApiProperty({ description: 'New status of the ticket', enum: TicketStatus })
  @IsEnum(TicketStatus)
  ticketStatus: TicketStatus;

  @ApiProperty({ description: 'New opening date of the ticket', required: false })
  @IsOptional()
  @IsDate()
  openedAt?: Date;

  @ApiProperty({ description: 'New closing date of the ticket', required: false })
  @IsOptional()
  @IsDate()
  closedAt?: Date;
}
