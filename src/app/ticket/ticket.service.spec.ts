import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketStatus } from 'src/shared/const/enum.const';

describe('TicketService', () => {
  let service: TicketService;
  let ticketRepo: Partial<TicketRepo>;
  let seatRepo: Partial<SeatRepo>;

  beforeEach(async () => {
    ticketRepo = {
      findByStatus: jest.fn().mockResolvedValue([
        { ticketId: 1, openedAt: new Date('2025-01-10'), closedAt: new Date('2025-01-12') },
        { ticketId: 2, openedAt: new Date('2025-01-11'), closedAt: new Date('2025-01-13') },
      ]),
    };
    seatRepo = {
      findByTicketId: jest.fn().mockResolvedValue([
        { seatId: 1, ticketId: 1, seatStatus: 'EMPTY' },
        { seatId: 2, ticketId: 1, seatStatus: 'FULL' },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        { provide: TicketRepo, useValue: ticketRepo },
        { provide: SeatRepo, useValue: seatRepo },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should retrieve tickets by status', async () => {
    const result = await service.getTicketsByStatus(TicketStatus.OPEN);
    expect(ticketRepo.findByStatus).toHaveBeenCalledWith(TicketStatus.OPEN);
    expect(result.length).toBe(2);
  });

  it('should retrieve seats by ticket ID', async () => {
    const result = await service.getSeatsByTicket(1);
    expect(seatRepo.findByTicketId).toHaveBeenCalledWith(1);
    expect(result[0].seatStatus).toBe('EMPTY');
  });

  it('should retrieve all available dates', async () => {
    const result = await service.getAvailableDates();
    expect(ticketRepo.findByStatus).toHaveBeenCalledWith(TicketStatus.OPEN);
    expect(result).toEqual(['2025-01-10', '2025-01-11', '2025-01-12', '2025-01-13']);
  });
});
