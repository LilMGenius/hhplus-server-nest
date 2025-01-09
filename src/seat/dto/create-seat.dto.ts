import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsEnum, IsString } from "class-validator";

export class CreateSeatDto {
  @ApiProperty({ description: 'Associated ticket ID' })
  @IsInt()
  ticketId: number;

  @ApiProperty({ description: 'Status of the seat', enum: ['FULL', 'EMPTY'] })
  @IsEnum(['FULL', 'EMPTY'])
  seatStatus: 'FULL' | 'EMPTY';

  @ApiProperty({ description: 'Code representing the seat' })
  @IsString()
  seatCode: string;

  @ApiProperty({ description: 'Price of the seat' })
  @IsInt()
  seatPrice: number;
}
