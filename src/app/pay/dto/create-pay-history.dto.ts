import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsUUID, IsEnum, IsString, IsDate } from "class-validator";
import { PayHistoryType } from "src/shared/const/enum.const";

export class CreatePayHistoryDto {
  @ApiProperty({ description: 'Associated ticketing ID' })
  @IsInt()
  ticketingId: number;

  @ApiProperty({ description: 'Associated user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Type of the payment history', enum: PayHistoryType })
  @IsEnum(PayHistoryType)
  historyType: PayHistoryType;

  @ApiProperty({ description: 'Name of the concert' })
  @IsString()
  concertName: string;

  @ApiProperty({ description: 'Date of the concert' })
  @IsDate()
  concertDate: Date;

  @ApiProperty({ description: 'Code of the seat' })
  @IsString()
  seatCode: string;

  @ApiProperty({ description: 'Price of the seat' })
  @IsInt()
  seatPrice: number;

  @ApiProperty({ description: 'Points before the transaction' })
  @IsInt()
  pointBefore: number;

  @ApiProperty({ description: 'Points after the transaction' })
  @IsInt()
  pointAfter: number;
}
