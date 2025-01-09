import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Unique ID of the payment history record' })
  @PrimaryGeneratedColumn()
  historyId: number;

  @ApiProperty({ description: 'Associated ticketing ID' })
  @ManyToOne(() => Ticketing, (ticketing) => ticketing.ticketingId)
  @JoinColumn({ name: 'ticketingId' })
  ticketingId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ApiProperty({ description: 'Type of the payment history', enum: PayHistoryType })
  @Column({ type: 'enum', enum: PayHistoryType })
  historyType: PayHistoryType;

  @ApiProperty({ description: 'Name of the concert' })
  @Column()
  concertName: string;

  @ApiProperty({ description: 'Date of the concert' })
  @Column()
  concertDate: Date;

  @ApiProperty({ description: 'Code of the seat' })
  @Column()
  seatCode: string;

  @ApiProperty({ description: 'Price of the seat' })
  @Column('int')
  seatPrice: number;

  @ApiProperty({ description: 'Points before the transaction' })
  @Column('int')
  pointBefore: number;

  @ApiProperty({ description: 'Points after the transaction' })
  @Column('int')
  pointAfter: number;

  @ApiProperty({ description: 'Creation date of the payment history record' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Refund date of the payment history record', required: false })
  @Column({ nullable: true })
  refundedAt: Date;
}
