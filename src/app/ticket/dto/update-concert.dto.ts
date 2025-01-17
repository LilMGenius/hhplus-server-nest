import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateConcertDto {
  @ApiProperty({ description: 'Concert ID to update' })
  @IsInt()
  concertId: number;

  @ApiProperty({ description: 'New name of the concert', required: false })
  @IsString()
  @IsOptional()
  concertName?: string;

  @ApiProperty({ description: 'New date of the concert', required: false })
  @IsDate()
  @IsOptional()
  concertDate?: Date;

  @ApiProperty({ description: 'New total number of seats', required: false })
  @IsInt()
  @IsOptional()
  totalSeats?: number;

  @ApiProperty({ description: 'New remaining seats', required: false })
  @IsInt()
  @IsOptional()
  remainSeats?: number;
}
