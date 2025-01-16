import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { TicketStatus } from 'src/shared/const/enum.const';
import { CreateTicketDto } from 'src/app/ticket/dto/create-ticket.dto';
import { UpdateTicketDto } from 'src/app/ticket/dto/update-ticket.dto';

@Injectable()
export class TicketRepo {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newSeat = this.repo.create(createTicketDto);
    return this.repo.save(newSeat);
  }

  async findById(ticketId: number): Promise<Ticket | null> {
    return this.repo.findOne({ where: { ticketId } });
  }

  async findByStatus(status: TicketStatus): Promise<Ticket[]> {
    return this.repo.find({ where: { ticketStatus: status } });
  }

  async update(updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findById(updateTicketDto.ticketId);
    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.ticketStatus = updateTicketDto.ticketStatus;
    ticket.openedAt = updateTicketDto.openedAt ?? ticket.openedAt;
    ticket.closedAt = updateTicketDto.closedAt ?? ticket.closedAt;
    return this.repo.save(ticket);
  }
}
