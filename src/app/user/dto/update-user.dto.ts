import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsDate, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'User ID to update' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'New name of the user', required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: 'New point of the user', required: false })
  @IsInt()
  @IsOptional()
  point?: number;
}
