import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { TicketStatus } from 'src/shared/const/enum.const';

@Injectable()
export class TicketRepo {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  async findById(ticketId: number): Promise<Ticket | null> {
    return this.repo.findOne({ where: { ticketId } });
  }

  async findByStatus(status: TicketStatus): Promise<Ticket[]> {
    return this.repo.find({ where: { ticketStatus: status } });
  }
}
