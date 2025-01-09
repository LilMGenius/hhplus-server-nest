import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { TicketingStatus } from 'src/shared/const/enum.const';

@Injectable()
export class TicketingRepo {
  constructor(
    @InjectRepository(Ticketing)
    private readonly repo: Repository<Ticketing>,
  ) {}

  async findById(ticketingId: number): Promise<Ticketing | null> {
    return this.repo.findOne({ where: { ticketingId } });
  }

  async findBySeatId(seatId: number): Promise<Ticketing | null> {
    return this.repo.findOne({ where: { seatId } });
  }

  async findByStatus(status: TicketingStatus): Promise<Ticketing[]> {
    return this.repo.find({ where: { ticketingStatus: status } });
  }

  async create(ticketing: Partial<Ticketing>): Promise<Ticketing> {
    const newTicketing = this.repo.create(ticketing);
    return this.repo.save(newTicketing);
  }
}
