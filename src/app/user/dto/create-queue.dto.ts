import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsDate, IsOptional } from 'class-validator';
import { QueueStatus } from 'src/shared/const/enum.const';

export class CreateQueueDto {
  @ApiProperty({ description: 'Associated user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Status of the queue', enum: QueueStatus })
  @IsEnum(QueueStatus)
  queueStatus: QueueStatus;

  @ApiProperty({ description: 'Creation date of the queue', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ description: 'Expiration date of the queue' })
  @IsDate()
  expiredAt: Date;
}
