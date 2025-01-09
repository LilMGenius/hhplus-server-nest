import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/interfaces/entities/user.entity';
import { QueueStatus } from 'src/shared/const/enum.const';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Queue {
  @ApiProperty({ description: 'Unique ID of the queue' })
  @PrimaryGeneratedColumn()
  queueId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ApiProperty({ description: 'Status of the queue', enum: QueueStatus })
  @Column({ type: 'enum', enum: QueueStatus })
  queueStatus: QueueStatus;

  @ApiProperty({ description: 'Creation date of the queue' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Expiration date of the queue' })
  @Column()
  expiredAt: Date;
}
