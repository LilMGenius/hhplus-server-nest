import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Concert {
  @ApiProperty({ description: 'Unique ID of the concert' })
  @PrimaryGeneratedColumn()
  concertId: number;

  @ApiProperty({ description: 'Name of the concert' })
  @Column()
  concertName: string;

  @ApiProperty({ description: 'Date of the concert' })
  @Column()
  concertDate: Date;

  @ApiProperty({ description: 'Creation date of the concert record' })
  @CreateDateColumn()
  createdAt: Date;
}
