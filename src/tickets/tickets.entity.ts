import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @ApiProperty({ example: 1, description: 'Unique ID of the ticket' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2025-01-23', description: 'Date of the ticket' })
  @Column()
  date: string;

  @ApiProperty({ example: 1, description: 'ID of the seat' })
  @Column()
  seat_id: number;

  @ApiProperty({ example: 'available', description: 'Status of the ticket' })
  @Column({ default: 'available' })
  status: string;
}
