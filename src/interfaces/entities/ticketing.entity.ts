import { Seat } from 'src/interfaces/entities/seat.entity';
import { User } from 'src/interfaces/entities/user.entity';
import { TicketingStatus } from 'src/shared/const/enum.const';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Ticketing {
  @PrimaryGeneratedColumn()
  ticketingId: number;

  @ManyToOne(() => Seat, (seat) => seat.seatId)
  @JoinColumn({ name: 'seatId' })
  seatId: number;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ type: 'enum', enum: TicketingStatus })
  ticketingStatus: TicketingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  revokedAt: Date;
}
