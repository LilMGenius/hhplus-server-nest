import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Concert {
  @PrimaryGeneratedColumn()
  concertId: number;

  @Column()
  concertName: string;

  @Column()
  concertDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
