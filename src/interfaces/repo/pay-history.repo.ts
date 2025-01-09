import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';

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
}
