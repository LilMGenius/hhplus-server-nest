import { Injectable } from '@nestjs/common';
import { Repository, OptimisticLockVersionMismatchError } from 'typeorm';
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

  async findById(historyId: number, version?: number): Promise<PayHistory | null> {
    if (!version) {
      return this.repo.findOne({ where: { historyId } });
    }
    return this.repo.findOne({ where: { historyId }, lock: { mode: 'optimistic', version } });
  }

  async findByUserId(userId: string): Promise<PayHistory[]> {
    return this.repo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async refund(refundPayHistoryDto: RefundPayHistoryDto): Promise<PayHistory> {
    // const payHistory = await this.findById(refundPayHistoryDto.historyId);
    const payHistory = await this.findById(
      refundPayHistoryDto.historyId,
      refundPayHistoryDto.version,
    );
    if (!payHistory) {
      throw new Error('Pay history not found');
    }
    if (payHistory.version !== refundPayHistoryDto.version) {
      throw new OptimisticLockVersionMismatchError(
        JSON.stringify(payHistory),
        refundPayHistoryDto.version,
        payHistory.version,
      );
    }

    payHistory.historyType = refundPayHistoryDto.historyType;
    payHistory.refundedAt = refundPayHistoryDto.refundedAt ?? payHistory.refundedAt;

    try {
      return await this.repo.save(payHistory);
    } catch (error) {
      if (error instanceof OptimisticLockVersionMismatchError) {
        throw new Error('Pay history update failed due to version conflict');
      }
      throw error;
    }
  }
}
