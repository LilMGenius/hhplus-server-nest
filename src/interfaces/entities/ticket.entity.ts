import { Concert } from 'src/interfaces/entities/concert.entity';
import { TicketStatus } from 'src/shared/const/enum.const';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @ManyToOne(() => Concert, (concert) => concert.concertId)
  @JoinColumn({ name: 'concertId' })
  concertId: number;

  @Column({ type: 'enum', enum: TicketStatus })
  ticketStatus: TicketStatus;

  @Column('int')
  totalSeats: number;

  @Column('int')
  remainSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  openedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;
}
