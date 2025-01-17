import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, IsDate } from 'class-validator';
import { SeatStatus } from 'src/shared/const/enum.const';

export class UpdateSeatDto {
  @ApiProperty({ description: 'Seat ID to update' })
  @IsInt()
  seatId: number;

  @ApiProperty({ description: 'New status of the seat', enum: SeatStatus })
  @IsEnum(SeatStatus)
  seatStatus: SeatStatus;

  @ApiProperty({ description: 'New price of the seat', required: false })
  @IsInt()
  @IsOptional()
  seatPrice?: number;

  @ApiProperty({ description: 'Update date of the seat', required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ description: 'New version of the seat', required: false })
  @IsInt()
  @IsOptional()
  version?: number;
}
