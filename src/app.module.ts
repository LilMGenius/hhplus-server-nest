import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'src/interfaces/http/middlewares/logger/logger.module';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { LoggerMiddleware } from 'src/interfaces/http/middlewares/logger/logger.middleware';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserModule } from 'src/interfaces/modules/user.module';
import { TicketModule } from 'src/interfaces/modules/ticket.module';
import { PayModule } from 'src/interfaces/modules/pay.module';
import { QueueScheduler } from 'src/interfaces/schedulers/queue.scheduler';
import { SeatScheduler } from 'src/interfaces/schedulers/seat.scheduler';
import { HttpExceptionFilter } from 'src/interfaces/http/filters/http-exception.filter';
import { AuthenticationGuard } from 'src/interfaces/http/guards/authentication.guard';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    LoggerModule,
    DatabaseModule,
    UserModule,
    TicketModule,
    PayModule,
  ],
  providers: [
    LoggerService,
    QueueScheduler,
    SeatScheduler,
    HttpExceptionFilter,
    AuthenticationGuard,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
