import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should return available dates', () => {
    expect(service.getAvailableDates()).toEqual(['2025-01-23', '2025-01-24']);
  });

  it('should reserve a seat', () => {
    const result = service.reserveSeat({ date: '2025-01-23', seat_id: 1 });
    expect(result.status).toBe('reserved');
  });
});
