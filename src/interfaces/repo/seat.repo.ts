import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { SeatStatus } from 'src/shared/const/enum.const';
import { CreateSeatDto } from 'src/app/ticket/dto/create-seat.dto';
import { UpdateSeatDto } from 'src/app/ticket/dto/update-seat.dto';

@Injectable()
export class SeatRepo {
  constructor(
    @InjectRepository(Seat)
    private readonly repo: Repository<Seat>,
  ) {}

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    const newSeat = this.repo.create(createSeatDto);
    return this.repo.save(newSeat);
  }

  async findById(seatId: number): Promise<Seat | null> {
    return this.repo.findOne({ where: { seatId } });
  }

  async findByTicketId(ticketId: number): Promise<Seat[]> {
    return this.repo.find({ where: { ticketId } });
  }

  async findByStatus(status: SeatStatus): Promise<Seat[]> {
    return this.repo.find({ where: { seatStatus: status } });
  }

  async update(updateSeatDto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.findById(updateSeatDto.seatId);
    if (!seat) {
      throw new Error('Seat not found');
    }

    seat.seatStatus = updateSeatDto.seatStatus;
    seat.seatPrice = updateSeatDto.seatPrice ?? seat.seatPrice;
    return this.repo.save(seat);
  }
}
