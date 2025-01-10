import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';
import { QueueStatus } from 'src/shared/const/enum.const';

export class UpdateQueueDto {
  @ApiProperty({ description: 'User ID to update' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'New status of the queue', enum: QueueStatus })
  @IsEnum(QueueStatus)
  queueStatus: QueueStatus;
}
