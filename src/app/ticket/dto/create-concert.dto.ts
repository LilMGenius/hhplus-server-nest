import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt, IsOptional } from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({ description: 'Name of the concert' })
  @IsString()
  concertName: string;

  @ApiProperty({ description: 'Date of the concert' })
  @IsDate()
  concertDate: Date;

  @ApiProperty({ description: 'Total number of seats available' })
  @IsInt()
  totalSeats: number;

  @ApiProperty({ description: 'Remaining seats available' })
  @IsInt()
  remainSeats: number;

  @ApiProperty({ description: 'Creation date of the concert', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
