import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { CreatePayHistoryDto } from 'src/app/pay/dto/create-pay-history.dto';
import { CreateTicketingDto } from 'src/app/pay/dto/create-ticketing.dto';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { ConcertRepo } from 'src/interfaces/repo/concert.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import {
  SeatStatus,
  TicketStatus,
  TicketingStatus,
  PayHistoryType,
} from 'src/shared/const/enum.const';

@Injectable()
export class PayService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepo: UserRepo,
    private readonly seatRepo: SeatRepo,
    private readonly ticketRepo: TicketRepo,
    private readonly concertRepo: ConcertRepo,
    private readonly ticketingRepo: TicketingRepo,
    private readonly payHistoryRepo: PayHistoryRepo,
  ) {}

  async pay(createPayHistoryDto: CreatePayHistoryDto) {
    const user = await this.userRepo.findById(createPayHistoryDto.userId);
    if (!user) throw new Error('User not found');

    const ticketing = await this.ticketingRepo.findById(createPayHistoryDto.ticketingId);
    if (!ticketing) throw new Error('Ticketing not found');

    const seat = await this.seatRepo.findById(ticketing.seatId);
    if (!seat) throw new Error('Seat not found');

    const ticket = await this.ticketRepo.findById(seat.ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const concert = await this.concertRepo.findById(ticket.concertId);
    if (!concert) throw new Error('Concert not found');

    const isPayable = user.point >= createPayHistoryDto.seatPrice;

    const payHistory = await this.payHistoryRepo.create({
      ...createPayHistoryDto,
      historyType: isPayable ? PayHistoryType.SUCCESS : PayHistoryType.FAIL,
      pointAfter: isPayable ? user.point - createPayHistoryDto.seatPrice : user.point,
      pointBefore: user.point,
      createdAt: new Date(),
    });

    if (isPayable) {
      await this.ticketingRepo.update({ ...ticketing, ticketingStatus: TicketingStatus.PAID });
      await this.ticketRepo.update({ ...ticket, ticketStatus: TicketStatus.CLOSE });
      await this.concertRepo.update({ ...concert, remainSeats: concert.remainSeats - 1 });
    }

    try {
      await this.userRepo.update({
        ...user,
        point: isPayable ? user.point - createPayHistoryDto.seatPrice : user.point,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }

    try {
      await this.seatRepo.update({
        ...seat,
        seatStatus: isPayable ? SeatStatus.FULL : SeatStatus.EMPTY,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }

    return payHistory;
  }

  async ticketing(createTicketingDto: CreateTicketingDto) {
    const seat = await this.seatRepo.findById(createTicketingDto.seatId);
    if (!seat || seat.seatStatus !== SeatStatus.EMPTY) {
      throw new Error('Seat is not available');
    }

    const ticket = await this.ticketRepo.findById(seat.ticketId);
    if (!ticket) throw new Error('Ticket not found');

    const concert = await this.concertRepo.findById(ticket.concertId);
    if (!concert) throw new Error('Concert not found');

    try {
      await this.seatRepo.update({
        ...seat,
        seatStatus: SeatStatus.TEMP,
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
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
