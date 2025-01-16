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
  @PrimaryGeneratedColumn()
  queueId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ type: 'enum', enum: QueueStatus })
  queueStatus: QueueStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiredAt: Date;
}
