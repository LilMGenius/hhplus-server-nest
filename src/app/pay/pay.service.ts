import { Injectable } from '@nestjs/common';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { CreateTicketingDto } from 'src/app/pay/dto/create-ticketing.dto';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import { SeatStatus, TicketingStatus, PayHistoryType } from 'src/shared/const/enum.const';

@Injectable()
export class PayService {
  constructor(
    private readonly seatRepo: SeatRepo,
    private readonly ticketRepo: TicketRepo,
    private readonly ticketingRepo: TicketingRepo,
    private readonly payHistoryRepo: PayHistoryRepo,
    private readonly userRepo: UserRepo,
  ) {}

  async pay(createPayHistoryDto: CreatePayHistoryDto) {
    const user = await this.userRepo.findById(createPayHistoryDto.userId);
    if (!user) throw new Error('User not found');

    const isPayable = user.point >= createPayHistoryDto.seatPrice;

    const payHistory = await this.payHistoryRepo.create({
      ...createPayHistoryDto,
      historyType: isPayable ? PayHistoryType.SUCCESS : PayHistoryType.FAIL,
      pointAfter: isPayable ? user.point - createPayHistoryDto.seatPrice : user.point,
      pointBefore: user.point,
      createdAt: new Date(),
    });

    if (isPayable) {
      user.point -= createPayHistoryDto.seatPrice;
      await this.userRepo.update(user.userId, { point: user.point });
    }

    return payHistory;
  }

  async ticketing(createTicketingDto: CreateTicketingDto) {
    const seat = await this.seatRepo.findById(createTicketingDto.seatId);
    if (!seat || seat.seatStatus !== SeatStatus.EMPTY) {
      throw new Error('Seat is not available');
    }

    const ticket = await this.ticketRepo.findById(seat.ticketId);
    if (!ticket) {
      throw new Error('Ticket not found for the provided seat');
    }

    const ticketing = await this.ticketingRepo.create({
      ...createTicketingDto,
      ticketingStatus: TicketingStatus.PENDING,
      createdAt: new Date(),
    });

    return ticketing;
  }

  async getPayHistoryByUser(userId: string) {
    return this.payHistoryRepo.findByUserId(userId);
  }
}
