import { Test, TestingModule } from '@nestjs/testing';
import { PayService } from 'src/app/pay/pay.service';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { ConcertRepo } from 'src/interfaces/repo/concert.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import { SeatStatus, TicketingStatus, PayHistoryType } from 'src/shared/const/enum.const';
import { v4 as uuidv4 } from 'uuid';

describe('Integration Tests: PayService with Mocks', () => {
  let payService: PayService;
  let userRepo: Partial<UserRepo>;
  let seatRepo: Partial<SeatRepo>;
  let ticketRepo: Partial<TicketRepo>;
  let concertRepo: Partial<ConcertRepo>;
  let ticketingRepo: Partial<TicketingRepo>;
  let payHistoryRepo: Partial<PayHistoryRepo>;

  beforeEach(async () => {
    userRepo = {
      findById: jest.fn().mockResolvedValue({ userId: uuidv4(), point: 100 }),
      update: jest.fn(),
    };

    seatRepo = {
      findById: jest.fn().mockResolvedValue({ seatId: 1, seatStatus: SeatStatus.EMPTY }),
      update: jest.fn(),
    };

    ticketRepo = {
      findById: jest.fn().mockResolvedValue({ ticketId: 1 }),
      update: jest.fn(),
    };

    concertRepo = {
      findById: jest.fn().mockResolvedValue({ concertId: 1, remainSeats: 10 }),
      update: jest.fn(),
    };

    ticketingRepo = {
      create: jest.fn().mockResolvedValue({ ticketingId: 1 }),
      findById: jest
        .fn()
        .mockResolvedValue({ ticketingId: 1, seatId: 1, ticketingStatus: TicketingStatus.PENDING }),
      update: jest.fn(),
    };

    payHistoryRepo = {
      create: jest.fn().mockResolvedValue({ historyId: 1, historyType: PayHistoryType.SUCCESS }),
      findByUserId: jest.fn().mockResolvedValue([]),
      refund: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayService,
        { provide: UserRepo, useValue: userRepo },
        { provide: SeatRepo, useValue: seatRepo },
        { provide: TicketRepo, useValue: ticketRepo },
        { provide: ConcertRepo, useValue: concertRepo },
        { provide: TicketingRepo, useValue: ticketingRepo },
        { provide: PayHistoryRepo, useValue: payHistoryRepo },
      ],
    }).compile();

    payService = module.get<PayService>(PayService);
  });

  it('should process pay successfully', async () => {
    const ticketingDto = {
      ticketingId: 1,
      userId: uuidv4(),
      historyType: PayHistoryType.SUCCESS,
      seatPrice: 50,
      concertName: 'Concert A',
      concertDate: new Date(),
      seatCode: 'A1',
      pointBefore: 100,
      pointAfter: 50,
      createdAt: new Date(),
    };

    const result = await payService.pay(ticketingDto);

    expect(userRepo.findById).toHaveBeenCalledWith(ticketingDto.userId);
    expect(seatRepo.findById).toHaveBeenCalledWith(1);
    expect(ticketingRepo.update).toHaveBeenCalledWith(
      expect.objectContaining({ ticketingStatus: TicketingStatus.PAID }),
    );
    expect(payHistoryRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ historyType: PayHistoryType.SUCCESS }),
    );
    expect(result.historyType).toBe(PayHistoryType.SUCCESS);
  });

  it('should handle seat already full error during ticketing', async () => {
    jest.spyOn(seatRepo, 'findById').mockResolvedValueOnce({
      seatId: 1,
      ticketId: 1,
      seatStatus: SeatStatus.FULL,
      seatCode: 'A1',
      seatPrice: 50,
      version: 1,
    });

    const ticketingDto = {
      seatId: 1,
      userId: uuidv4(),
      ticketingStatus: TicketingStatus.PENDING,
      createdAt: new Date(),
    };

    await expect(payService.ticketing(ticketingDto)).rejects.toThrow('Seat is not available');
  });

  it('should handle insufficient points during payment', async () => {
    const userId = uuidv4();

    jest.spyOn(userRepo, 'findById').mockResolvedValueOnce({
      userId,
      userName: 'User A',
      point: 20,
      createdAt: new Date(),
    });

    payHistoryRepo.create = jest.fn().mockResolvedValueOnce({
      historyId: 1,
      historyType: PayHistoryType.FAIL,
    });

    const ticketingDto = {
      ticketingId: 1,
      userId,
      historyType: PayHistoryType.FAIL,
      seatPrice: 50,
      concertName: 'Concert B',
      concertDate: new Date(),
      seatCode: 'B1',
      pointBefore: 20,
      pointAfter: 20,
      createdAt: new Date(),
    };

    const result = await payService.pay(ticketingDto);

    expect(result.historyType).toBe(PayHistoryType.FAIL);
    expect(payHistoryRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ historyType: PayHistoryType.FAIL }),
    );
  });
});
