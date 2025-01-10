import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { SeatStatus } from 'src/shared/const/enum.const';

@Injectable()
export class SeatRepo {
  constructor(
    @InjectRepository(Seat)
    private readonly repo: Repository<Seat>,
  ) {}

  async findById(seatId: number): Promise<Seat | null> {
    return this.repo.findOne({ where: { seatId } });
  }

  async findByTicketId(ticketId: number): Promise<Seat[]> {
    return this.repo.find({ where: { ticketId } });
  }

  async findByStatus(status: SeatStatus): Promise<Seat[]> {
    return this.repo.find({ where: { seatStatus: status } });
  }
}
