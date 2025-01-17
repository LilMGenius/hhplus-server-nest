import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { TestingModule, Test } from '@nestjs/testing';
import { StartedMySqlContainer, MySqlContainer } from '@testcontainers/mysql';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/interfaces/entities/user.entity';
import { Queue } from 'src/interfaces/entities/queue.entity';
import { Seat } from 'src/interfaces/entities/seat.entity';
import { Ticket } from 'src/interfaces/entities/ticket.entity';
import { Concert } from 'src/interfaces/entities/concert.entity';
import { Ticketing } from 'src/interfaces/entities/ticketing.entity';
import { PayHistory } from 'src/interfaces/entities/pay-history.entity';
import { UserService } from 'src/app/user/user.service';
import { PayService } from 'src/app/pay/pay.service';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { SeatRepo } from 'src/interfaces/repo/seat.repo';
import { TicketRepo } from 'src/interfaces/repo/ticket.repo';
import { ConcertRepo } from 'src/interfaces/repo/concert.repo';
import { TicketingRepo } from 'src/interfaces/repo/ticketing.repo';
import { PayHistoryRepo } from 'src/interfaces/repo/pay-history.repo';
import {
  QueueStatus,
  SeatStatus,
  TicketStatus,
  TicketingStatus,
  PayHistoryType,
} from 'src/shared/const/enum.const';

describe('Integration Tests: Concurrency with Testcontainers', () => {
  jest.setTimeout(1000 * 60);

  let logger: LoggerService;
  let module: TestingModule;
  let mysql: StartedMySqlContainer;
  let userService: UserService;
  let payService: PayService;

  beforeAll(async () => {
    mysql = await new MySqlContainer('mysql:8')
      .withDatabase('dbname')
      .withUser('root')
      .withRootPassword('pw')
      .withCommand(['--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci'])
      .start();

    // global.mysql = mysql

    process.env.DB_HOST = mysql.getHost();
    process.env.DB_PORT = mysql.getPort().toString();
    process.env.DB_USERNAME = mysql.getUsername();
    process.env.DB_PASSWORD = mysql.getUserPassword();
    process.env.DB_DATABASE = mysql.getDatabase();
    process.env.DB_LOGGING_ENABLED = 'false';

    module = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User, Queue, Seat, Ticket, Concert, Ticketing, PayHistory]),
      ],
      providers: [
        UserService,
        PayService,
        UserRepo,
        QueueRepo,
        SeatRepo,
        TicketRepo,
        ConcertRepo,
        TicketingRepo,
        PayHistoryRepo,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    payService = module.get<PayService>(PayService);
  });

  afterAll(async () => {
    await module.close();
    await mysql.stop();
  });

  it('should process pay successfully', async () => {
    const userRepo = module.get<UserRepo>(UserRepo);
    const concertRepo = module.get<ConcertRepo>(ConcertRepo);
    const ticketRepo = module.get<TicketRepo>(TicketRepo);
    const seatRepo = module.get<SeatRepo>(SeatRepo);
    const ticketingRepo = module.get<TicketingRepo>(TicketingRepo);

    const user = await userRepo.create({ userName: 'Youngthug Lee' });

    await userService.updateUser({
      userId: user.userId,
      point: 100,
    });

    const concert = await concertRepo.create({
      concertName: 'Young Thug Concert in Korea',
      concertDate: new Date(),
      totalSeats: 666,
    });

    const ticket = await ticketRepo.create({
      concertId: concert.concertId,
      ticketStatus: TicketStatus.OPEN,
    });

    const seat = await seatRepo.create({
      ticketId: ticket.ticketId,
      seatStatus: SeatStatus.EMPTY,
      seatCode: 'A1',
      seatPrice: 50,
    });

    const ticketing = await ticketingRepo.create({
      userId: user.userId,
      seatId: seat.seatId,
      ticketingStatus: TicketingStatus.PENDING,
    });

    const payHistoryDto = {
      ticketingId: ticketing.ticketingId,
      userId: user.userId,
      historyType: PayHistoryType.SUCCESS,
      concertName: concert.concertName,
      concertDate: concert.concertDate,
      seatCode: seat.seatCode,
      seatPrice: seat.seatPrice,
      pointBefore: 100,
      pointAfter: 50,
    };

    const result = await payService.pay(payHistoryDto);

    expect(result.historyType).toBe(PayHistoryType.SUCCESS);

    const updatedTicketing = await ticketingRepo.findById(ticketing.ticketingId);
    expect(updatedTicketing?.ticketingStatus).toBe(TicketingStatus.PAID);

    const updatedSeat = await seatRepo.findById(seat.seatId);
    expect(updatedSeat?.seatStatus).toBe(SeatStatus.FULL);

    const updatedTicket = await ticketRepo.findById(ticket.ticketId);
    expect(updatedTicket?.ticketStatus).toBe(TicketStatus.CLOSE);

    const updatedConcert = await concertRepo.findById(concert.concertId);
    expect(updatedConcert?.remainSeats).toBe(665);

    const updatedUser = await userRepo.findById(user.userId);
    expect(updatedUser?.point).toBe(50);
  });

  it('should allow multiple pay requests for different seats by ticket', async () => {
    const userRepo = module.get<UserRepo>(UserRepo);
    const concertRepo = module.get<ConcertRepo>(ConcertRepo);
    const ticketRepo = module.get<TicketRepo>(TicketRepo);
    const seatRepo = module.get<SeatRepo>(SeatRepo);
    const ticketingRepo = module.get<TicketingRepo>(TicketingRepo);

    const user = await userRepo.create({ userName: 'Youngthug Lee' });

    await userService.updateUser({
      userId: user.userId,
      point: 100,
    });

    const concert = await concertRepo.create({
      concertName: 'Young Thug Concert in Korea',
      concertDate: new Date(),
      totalSeats: 666,
    });

    const ticket1 = await ticketRepo.create({
      concertId: concert.concertId,
      ticketStatus: TicketStatus.OPEN,
    });
    const ticket2 = await ticketRepo.create({
      concertId: concert.concertId,
      ticketStatus: TicketStatus.OPEN,
    });

    const seat1 = await seatRepo.create({
      ticketId: ticket1.ticketId,
      seatStatus: SeatStatus.EMPTY,
      seatCode: 'A1',
      seatPrice: 60,
    });
    const seat2 = await seatRepo.create({
      ticketId: ticket2.ticketId,
      seatStatus: SeatStatus.EMPTY,
      seatCode: 'B2',
      seatPrice: 40,
    });

    const ticketing1 = await ticketingRepo.create({
      userId: user.userId,
      seatId: seat1.seatId,
      ticketingStatus: TicketingStatus.PENDING,
    });
    const ticketing2 = await ticketingRepo.create({
      userId: user.userId,
      seatId: seat2.seatId,
      ticketingStatus: TicketingStatus.PENDING,
    });

    const payHistoryDto1 = {
      ticketingId: ticketing1.ticketingId,
      userId: user.userId,
      historyType: PayHistoryType.SUCCESS,
      concertName: concert.concertName,
      concertDate: concert.concertDate,
      seatCode: seat1.seatCode,
      seatPrice: seat1.seatPrice,
      pointBefore: 100,
      pointAfter: 40,
      createdAt: new Date(),
    };
    const payHistoryDto2 = {
      ticketingId: ticketing2.ticketingId,
      userId: user.userId,
      historyType: PayHistoryType.SUCCESS,
      concertName: concert.concertName,
      concertDate: concert.concertDate,
      seatCode: seat2.seatCode,
      seatPrice: seat2.seatPrice,
      pointBefore: 40,
      pointAfter: 0,
      createdAt: new Date(),
    };

    const results = await Promise.allSettled([
      payService.pay(payHistoryDto1),
      payService.pay(payHistoryDto2),
    ]);

    logger.debug(results.toString());

    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter((r) => r.status === 'rejected');

    expect(fulfilled.length + rejected.length).toBe(2);
    expect(fulfilled.length).toBe(2);
    expect(rejected.length).toBe(0);

    const updatedUser = await userRepo.findById(user.userId);
    expect(updatedUser?.point).toBe(60);

    const updatedSeat1 = await seatRepo.findById(seat1.seatId);
    expect(updatedSeat1?.seatStatus).toBe(SeatStatus.EMPTY);
    const updatedSeat2 = await seatRepo.findById(seat2.seatId);
    expect(updatedSeat2?.seatStatus).toBe(SeatStatus.EMPTY);

    const updatedTicket1 = await ticketRepo.findById(ticket1.ticketId);
    expect(updatedTicket1?.ticketStatus).toBe(TicketStatus.OPEN);
    const updatedTicket2 = await ticketRepo.findById(ticket2.ticketId);
    expect(updatedTicket2?.ticketStatus).toBe(TicketStatus.OPEN);

    const updatedConcert = await concertRepo.findById(concert.concertId);
    expect(updatedConcert?.remainSeats).toBe(666);
  });

  it('should disallow multiple ticketing requests for the same seat', async () => {
    const userRepo = module.get<UserRepo>(UserRepo);
    const concertRepo = module.get<ConcertRepo>(ConcertRepo);
    const ticketRepo = module.get<TicketRepo>(TicketRepo);
    const seatRepo = module.get<SeatRepo>(SeatRepo);

    const user1 = await userRepo.create({ userName: 'Youngthug Lee' });
    const user2 = await userRepo.create({ userName: 'Jini Kim' });

    await userService.updateUser({
      userId: user1.userId,
      point: 100,
    });
    await userService.updateUser({
      userId: user2.userId,
      point: 10,
    });

    const concert = await concertRepo.create({
      concertName: 'Young Thug Concert in Korea',
      concertDate: new Date(),
      totalSeats: 666,
    });

    const ticket = await ticketRepo.create({
      concertId: concert.concertId,
      ticketStatus: TicketStatus.OPEN,
    });

    const seat = await seatRepo.create({
      ticketId: ticket.ticketId,
      seatStatus: SeatStatus.EMPTY,
      seatCode: 'C1',
      seatPrice: 20,
    });

    const ticketingDto1 = {
      seatId: seat.seatId,
      userId: user1.userId,
      ticketingStatus: TicketingStatus.PENDING,
      createdAt: new Date(),
    };
    const ticketingDto2 = {
      seatId: seat.seatId,
      userId: user2.userId,
      ticketingStatus: TicketingStatus.PENDING,
      createdAt: new Date(),
    };

    const results = await Promise.allSettled([
      payService.ticketing(ticketingDto1),
      payService.ticketing(ticketingDto2),
    ]);

    logger.debug(results.toString());

    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter((r) => r.status === 'rejected');

    expect(fulfilled.length + rejected.length).toBe(2);
    expect(fulfilled.length).toBe(2);
    expect(rejected.length).toBe(0);

    const updatedSeat = await seatRepo.findById(seat.seatId);
    expect(updatedSeat?.seatStatus).toBe(SeatStatus.TEMP);

    const updatedTicket = await ticketRepo.findById(ticket.ticketId);
    expect(updatedTicket?.ticketStatus).toBe(TicketStatus.OPEN);

    const updatedConcert = await concertRepo.findById(concert.concertId);
    expect(updatedConcert?.remainSeats).toBe(666);
  });

  it('should allow multiple charge requests for the same user', async () => {
    const userRepo = module.get<UserRepo>(UserRepo);

    const user = await userRepo.create({ userName: 'Youngthug Lee' });

    await userService.updateUser({
      userId: user.userId,
      point: 100,
    });

    const updateDto1 = {
      userId: user.userId,
      point: 50,
    };
    const updateDto2 = {
      userId: user.userId,
      point: 200,
    };

    const results = await Promise.allSettled([
      userRepo.update(updateDto1),
      userRepo.update(updateDto2),
    ]);

    logger.debug(results.toString());

    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter((r) => r.status === 'rejected');

    expect(fulfilled.length + rejected.length).toBe(2);
    expect(fulfilled.length).toBe(2);
    expect(rejected.length).toBe(0);

    const updatedUser = await userRepo.findById(user.userId);
    expect(updatedUser?.point).toBe(50);
  });
});
