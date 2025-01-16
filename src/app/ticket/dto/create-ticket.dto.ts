import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { TicketStatus } from 'src/shared/const/enum.const';

export class CreateTicketDto {
  @ApiProperty({ description: 'Associated concert ID' })
  @IsInt()
  concertId: number;

  @ApiProperty({ description: 'Status of the ticket', enum: TicketStatus })
  @IsEnum(TicketStatus)
  ticketStatus: TicketStatus;

  @ApiProperty({ description: 'Creation date of the ticket', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ description: 'Opening date of the ticket', required: false })
  @IsDate()
  @IsOptional()
  openedAt?: Date;

  @ApiProperty({ description: 'Closing date of the ticket', required: false })
  @IsDate()
  @IsOptional()
  closedAt?: Date;
}
