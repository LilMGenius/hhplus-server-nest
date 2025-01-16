import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { PayHistoryType } from 'src/shared/const/enum.const';

export class RefundPayHistoryDto {
  @ApiProperty({ description: 'History ID to update' })
  @IsInt()
  historyId: number;

  @ApiProperty({ description: 'New type of the payment history', enum: PayHistoryType })
  @IsEnum(PayHistoryType)
  historyType: PayHistoryType;

  @ApiProperty({ description: 'Refund date of the transaction', required: false })
  @IsDate()
  @IsOptional()
  refundedAt?: Date;
}
