import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { CreateConcertDto } from 'src/app/ticket/dto/create-concert.dto';
import { UpdateConcertDto } from 'src/app/ticket/dto/update-concert.dto';

@Injectable()
export class ConcertRepo {
  constructor(
    @InjectRepository(Concert)
    private readonly repo: Repository<Concert>,
  ) {}

  async create(createConcertDto: CreateConcertDto): Promise<Concert> {
    createConcertDto.remainSeats = createConcertDto.remainSeats ?? createConcertDto.totalSeats;
    const newConcert = this.repo.create(createConcertDto);
    return this.repo.save(newConcert);
  }

  async findById(concertId: number): Promise<Concert | null> {
    return this.repo.findOne({ where: { concertId } });
  }

  async update(updateConcertDto: UpdateConcertDto): Promise<Concert> {
    const concert = await this.findById(updateConcertDto.concertId);
    if (!concert) {
      throw new Error('Concert not found');
    }

    concert.concertName = updateConcertDto.concertName ?? concert.concertName;
    concert.concertDate = updateConcertDto.concertDate ?? concert.concertDate;
    concert.totalSeats = updateConcertDto.totalSeats ?? concert.totalSeats;
    concert.remainSeats = updateConcertDto.remainSeats ?? concert.remainSeats;
    return this.repo.save(concert);
  }
}
