import { Injectable } from '@nestjs/common';
import { Repository, OptimisticLockVersionMismatchError, LessThanOrEqual } from 'typeorm';
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
    createSeatDto.updatedAt = createSeatDto.updatedAt ?? new Date();
    const newSeat = this.repo.create(createSeatDto);
    return this.repo.save(newSeat);
  }

  async findById(seatId: number, version?: number): Promise<Seat | null> {
    if (!version) {
      return this.repo.findOne({ where: { seatId } });
    }
    return this.repo.findOne({ where: { seatId }, lock: { mode: 'optimistic', version } });
  }

  async findByTicketId(ticketId: number): Promise<Seat[]> {
    return this.repo.find({ where: { ticketId } });
  }

  async findByStatus(status: SeatStatus): Promise<Seat[]> {
    return this.repo.find({ where: { seatStatus: status } });
  }

  async update(updateSeatDto: UpdateSeatDto): Promise<Seat> {
    // const seat = await this.findById(updateSeatDto.seatId);
    const seat = await this.findById(updateSeatDto.seatId, updateSeatDto.version);
    if (!seat) {
      throw new Error('Seat not found');
    }
    if (seat.version !== updateSeatDto.version) {
      throw new OptimisticLockVersionMismatchError(
        JSON.stringify(seat),
        updateSeatDto.version,
        seat.version,
      );
    }

    seat.seatStatus = updateSeatDto.seatStatus;
    seat.seatPrice = updateSeatDto.seatPrice ?? seat.seatPrice;
    seat.updatedAt = updateSeatDto.updatedAt ?? seat.updatedAt;

    try {
      return await this.repo.save(seat);
    } catch (error) {
      if (error instanceof OptimisticLockVersionMismatchError) {
        throw new Error('Seat update failed due to version conflict');
      }
      throw error;
    }
  }

  async findExpiredSeats(fiveMinutesAgo: Date): Promise<Seat[]> {
    return this.repo.find({
      where: {
        seatStatus: SeatStatus.TEMP,
        updatedAt: LessThanOrEqual(fiveMinutesAgo),
      },
    });
  }
}
