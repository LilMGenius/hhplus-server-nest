import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, IsDate } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ description: 'Associated concert ID' })
  @IsInt()
  concertId: number;

  @ApiProperty({ description: 'Status of the ticket', enum: ['WAIT', 'OPEN', 'CLOSE'] })
  @IsEnum(['WAIT', 'OPEN', 'CLOSE'])
  ticketStatus: 'WAIT' | 'OPEN' | 'CLOSE';

  @ApiProperty({ description: 'Total number of seats available' })
  @IsInt()
  totalSeats: number;

  @ApiProperty({ description: 'Remaining seats available' })
  @IsInt()
  remainSeats: number;

  @ApiProperty({ description: 'Opening date of the ticket', required: false })
  @IsOptional()
  @IsDate()
  openedAt?: Date;

  @ApiProperty({ description: 'Closing date of the ticket', required: false })
  @IsOptional()
  @IsDate()
  closedAt?: Date;
}
