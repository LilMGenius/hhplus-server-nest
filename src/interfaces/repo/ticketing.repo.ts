import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { TicketingStatus } from 'src/shared/const/enum.const';
import { CreateTicketingDto } from 'src/app/pay/dto/create-ticketing.dto';
import { UpdateTicketingDto } from 'src/app/pay/dto/update-ticketing.dto';

@Injectable()
export class TicketingRepo {
  constructor(
    @InjectRepository(Ticketing)
    private readonly repo: Repository<Ticketing>,
  ) {}

  async create(createTicketingDto: CreateTicketingDto): Promise<Ticketing> {
    const newTicketing = this.repo.create(createTicketingDto);
    return this.repo.save(newTicketing);
  }

  async findById(ticketingId: number): Promise<Ticketing | null> {
    return this.repo.findOne({ where: { ticketingId } });
  }

  async findBySeatId(seatId: number): Promise<Ticketing | null> {
    return this.repo.findOne({ where: { seatId } });
  }

  async findByStatus(status: TicketingStatus): Promise<Ticketing[]> {
    return this.repo.find({ where: { ticketingStatus: status } });
  }

  async update(updateTicketingDto: UpdateTicketingDto): Promise<Ticketing> {
    const ticketing = await this.findById(updateTicketingDto.ticketingId);
    if (!ticketing) {
      throw new Error('Ticketing not found');
    }

    ticketing.ticketingStatus = updateTicketingDto.ticketingStatus;
    return this.repo.save(ticketing);
  }
}
