import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'Creation date of the user' })
  @IsDate()
  createdAt?: Date;
}
