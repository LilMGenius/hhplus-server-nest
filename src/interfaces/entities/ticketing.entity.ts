import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Unique ID of the ticketing record' })
  @PrimaryGeneratedColumn()
  ticketingId: number;

  @ApiProperty({ description: 'Associated seat ID' })
  @ManyToOne(() => Seat, (seat) => seat.seatId)
  @JoinColumn({ name: 'seatId' })
  seatId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ApiProperty({ description: 'Status of the ticketing', enum: TicketingStatus })
  @Column({ type: 'enum', enum: TicketingStatus })
  ticketingStatus: TicketingStatus;

  @ApiProperty({ description: 'Creation date of the ticketing record' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Revocation date of the ticketing record', required: false })
  @Column({ nullable: true })
  revokedAt: Date;
}
