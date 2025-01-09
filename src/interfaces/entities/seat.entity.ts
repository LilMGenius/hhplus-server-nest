import { ApiProperty } from "@nestjs/swagger";
import { Ticket } from "src/interfaces/entities/ticket.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";

@Entity()
export class Seat {
  @ApiProperty({ description: 'Unique ID of the seat' })
  @PrimaryGeneratedColumn()
  seatId: number;

  @ApiProperty({ description: 'Associated ticket ID' })
  @ManyToOne(() => Ticket, (ticket) => ticket.ticketId)
  @JoinColumn({ name: 'ticketId' })
  ticketId: number;

  @ApiProperty({ description: 'Status of the seat', enum: ['FULL', 'EMPTY'] })
  @Column({ type: 'enum', enum: ['FULL', 'EMPTY'] })
  seatStatus: 'FULL' | 'EMPTY';

  @ApiProperty({ description: 'Code representing the seat' })
  @Column()
  seatCode: string;

  @ApiProperty({ description: 'Price of the seat' })
  @Column('int')
  seatPrice: number;
}
