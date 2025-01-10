import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { User } from 'src/interfaces/entities/user.entity';
import { PayHistoryType } from 'src/shared/const/enum.const';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PayHistory {
  @PrimaryGeneratedColumn()
  historyId: number;

  @ManyToOne(() => Ticketing, (ticketing) => ticketing.ticketingId)
  @JoinColumn({ name: 'ticketingId' })
  ticketingId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ type: 'enum', enum: PayHistoryType })
  historyType: PayHistoryType;

  @Column()
  concertName: string;

  @Column()
  concertDate: Date;

  @Column()
  seatCode: string;

  @Column('int')
  seatPrice: number;

  @Column('int')
  pointBefore: number;

  @Column('int')
  pointAfter: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  refundedAt: Date;
}
