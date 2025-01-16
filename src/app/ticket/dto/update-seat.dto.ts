import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional } from 'class-validator';
import { SeatStatus } from 'src/shared/const/enum.const';

export class UpdateSeatDto {
  @ApiProperty({ description: 'Seat ID to update' })
  @IsInt()
  seatId: number;

  @ApiProperty({ description: 'New status of the seat', enum: SeatStatus })
  @IsEnum(SeatStatus)
  seatStatus: SeatStatus;

  @ApiProperty({ description: 'New price of the seat' })
  @IsOptional()
  @IsInt()
  seatPrice: number;
}
