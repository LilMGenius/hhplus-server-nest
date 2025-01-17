import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsString, IsDate, IsOptional } from 'class-validator';
import { SeatStatus } from 'src/shared/const/enum.const';

export class CreateSeatDto {
  @ApiProperty({ description: 'Associated ticket ID' })
  @IsInt()
  ticketId: number;

  @ApiProperty({ description: 'Status of the seat', enum: SeatStatus })
  @IsEnum(SeatStatus)
  seatStatus: SeatStatus;

  @ApiProperty({ description: 'Code representing the seat' })
  @IsString()
  seatCode: string;

  @ApiProperty({ description: 'Price of the seat' })
  @IsInt()
  seatPrice: number;

  @ApiProperty({ description: 'Update date of the seat', required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
