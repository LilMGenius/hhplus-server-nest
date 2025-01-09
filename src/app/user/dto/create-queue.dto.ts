import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsEnum, IsDate } from "class-validator";

export class CreateQueueDto {
  @ApiProperty({ description: 'Associated user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Status of the queue', enum: ['WAIT', 'ACTIVE', 'EXPIRY'] })
  @IsEnum(['WAIT', 'ACTIVE', 'EXPIRY'])
  queueStatus: 'WAIT' | 'ACTIVE' | 'EXPIRY';

  @ApiProperty({ description: 'Expiration date of the queue' })
  @IsDate()
  expiredAt: Date;
}
