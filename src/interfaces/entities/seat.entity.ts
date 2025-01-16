import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { SeatStatus } from 'src/shared/const/enum.const';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketId)
  @JoinColumn({ name: 'ticketId' })
  ticketId: number;

  @Column({ type: 'enum', enum: SeatStatus })
  seatStatus: SeatStatus;

  @Column()
  seatCode: string;

  @Column('int')
  seatPrice: number;

  @VersionColumn()
  version: number;
}
