import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Unique ID of the ticket' })
  @PrimaryGeneratedColumn()
  ticketId: number;

  @ApiProperty({ description: 'Associated concert ID' })
  @ManyToOne(() => Concert, (concert) => concert.concertId)
  @JoinColumn({ name: 'concertId' })
  concertId: number;

  @ApiProperty({ description: 'Status of the ticket', enum: TicketStatus })
  @Column({ type: 'enum', enum: TicketStatus })
  ticketStatus: TicketStatus;

  @ApiProperty({ description: 'Total number of seats available' })
  @Column('int')
  totalSeats: number;

  @ApiProperty({ description: 'Remaining seats available' })
  @Column('int')
  remainSeats: number;

  @ApiProperty({ description: 'Creation date of the ticket record' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Opening date of the ticket', required: false })
  @Column({ nullable: true })
  openedAt: Date;

  @ApiProperty({ description: 'Closing date of the ticket', required: false })
  @Column({ nullable: true })
  closedAt: Date;
}
