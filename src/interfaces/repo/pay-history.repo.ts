import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { RefundPayHistoryDto } from 'src/app/pay/dto/refund-pay-history.dto';

@Injectable()
export class PayHistoryRepo {
  constructor(
    @InjectRepository(PayHistory)
    private readonly repo: Repository<PayHistory>,
  ) {}

  async create(payHistory: CreatePayHistoryDto): Promise<PayHistory> {
    const newPayHistory = this.repo.create(payHistory);
    return this.repo.save(newPayHistory);
  }

  async findById(historyId: number): Promise<PayHistory | null> {
    return this.repo.findOne({ where: { historyId } });
  }

  async findByUserId(userId: string): Promise<PayHistory[]> {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async refund(refundPayHistoryDto: RefundPayHistoryDto): Promise<PayHistory> {
    const payHistory = await this.findById(refundPayHistoryDto.historyId);
    if (!payHistory) {
      throw new Error('Pay history not found');
    }

    payHistory.historyType = refundPayHistoryDto.historyType;
    payHistory.refundedAt = refundPayHistoryDto.refundedAt;
    return this.repo.save(payHistory);
  }
}
