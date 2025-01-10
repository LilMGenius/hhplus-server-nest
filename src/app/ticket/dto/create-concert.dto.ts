import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateConcertDto {
  @ApiProperty({ description: 'Name of the concert' })
  @IsString()
  concertName: string;

  @ApiProperty({ description: 'Date of the concert' })
  @IsDate()
  concertDate: Date;

  @ApiProperty({ description: 'Creation date of the concert' })
  @IsDate()
  createdAt?: Date;
}
