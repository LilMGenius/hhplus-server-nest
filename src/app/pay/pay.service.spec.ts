import { Test, TestingModule } from '@nestjs/testing';
import { PayService } from './pay.service';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { PayHistoryType } from 'src/shared/const/enum.const';
import { v4 as uuidv4 } from 'uuid';

describe('PayService', () => {
  let service: PayService;
  let userRepo: Partial<UserRepo>;
  let seatRepo: Partial<SeatRepo>;
  let ticketRepo: Partial<TicketRepo>;
  let ticketingRepo: Partial<TicketingRepo>;
  let payHistoryRepo: Partial<PayHistoryRepo>;

  beforeEach(async () => {
    userRepo = {
      findById: jest.fn().mockResolvedValue({
        userId: uuidv4(),
        userName: 'Seonmin Lee',
        point: 100,
        createdAt: new Date(),
      }),
      update: jest.fn().mockResolvedValue(undefined),
    };
    seatRepo = {
      findById: jest.fn().mockResolvedValue({ seatId: 1, seatStatus: 'EMPTY' }),
    };
    ticketRepo = {
      findById: jest.fn().mockResolvedValue({ ticketId: 1 }),
    };
    ticketingRepo = {
      create: jest.fn().mockResolvedValue({ ticketingId: 1 }),
    };
    payHistoryRepo = {
      create: jest.fn().mockImplementation(async (dto: CreatePayHistoryDto) => {
        return {
          historyId: 1,
          ticketingId: dto.ticketingId,
          userId: dto.userId,
          historyType: dto.historyType,
          seatCode: dto.seatCode,
          concertName: dto.concertName,
          seatPrice: dto.seatPrice,
          pointBefore: dto.pointBefore,
          pointAfter: dto.pointAfter,
          createdAt: new Date(),
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayService,
        { provide: UserRepo, useValue: userRepo },
        { provide: SeatRepo, useValue: seatRepo },
        { provide: TicketRepo, useValue: ticketRepo },
        { provide: TicketingRepo, useValue: ticketingRepo },
        { provide: PayHistoryRepo, useValue: payHistoryRepo },
      ],
    }).compile();

    service = module.get<PayService>(PayService);
  });

  it('should process payment successfully', async () => {
    const dto: CreatePayHistoryDto = {
      ticketingId: 1,
      userId: uuidv4(),
      historyType: PayHistoryType.SUCCESS,
      concertName: 'Concert A',
      concertDate: new Date(),
      seatCode: 'A1',
      seatPrice: 50,
      pointBefore: 100,
      pointAfter: 50,
    };

    const result = await service.pay(dto);

    expect(userRepo.findById).toHaveBeenCalledWith(dto.userId);
    expect(payHistoryRepo.create).toHaveBeenCalledWith(expect.objectContaining({ seatPrice: 50 }));
    expect(result.historyType).toBe(PayHistoryType.SUCCESS);
    expect(result.pointAfter).toBe(50);
  });

  it('should record failed payment in pay history', async () => {
    jest.spyOn(userRepo, 'findById').mockResolvedValueOnce({
      userId: uuidv4(),
      point: 30,
      userName: 'Seonmin Lee',
      createdAt: new Date(),
    });

    const dto: CreatePayHistoryDto = {
      ticketingId: 1,
      userId: uuidv4(),
      historyType: PayHistoryType.FAIL,
      concertName: 'Concert A',
      concertDate: new Date(),
      seatCode: 'A1',
      seatPrice: 50,
      pointBefore: 30,
      pointAfter: 30,
    };

    const result = await service.pay(dto);

    expect(userRepo.findById).toHaveBeenCalledWith(dto.userId);
    expect(payHistoryRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        historyType: PayHistoryType.FAIL,
      }),
    );
    expect(result.historyType).toBe(PayHistoryType.FAIL);
    expect(result.pointAfter).toBe(30);
  });
});
