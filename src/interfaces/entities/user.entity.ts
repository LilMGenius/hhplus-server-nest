import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  userName: string;

  @Column('int', { default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;
}
