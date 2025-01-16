import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsInt } from 'class-validator';

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

  @ApiProperty({ description: 'Creation date of the concert' })
  @IsDate()
  createdAt?: Date;
}
