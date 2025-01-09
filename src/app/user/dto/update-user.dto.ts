import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Points associated with the user', required: false })
  @IsInt()
  @IsOptional()
  point?: number;
}
