import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique ID of the user' })
  @PrimaryColumn('uuid')
  userId: string;

  @ApiProperty({ description: 'Name of the user' })
  @Column()
  userName: string;

  @ApiProperty({ description: 'Points associated with the user', default: 0 })
  @Column('int', { default: 0 })
  point: number;

  @ApiProperty({ description: 'Account creation date' })
  @CreateDateColumn()
  createdAt: Date;
}
