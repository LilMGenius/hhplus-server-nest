import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  seat_id: number;

  @Column({ default: 'available' })
  status: string;
}
