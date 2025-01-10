import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'New name of the user', required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: 'New point of the user', required: false })
  @IsInt()
  @IsOptional()
  point?: number;
}
