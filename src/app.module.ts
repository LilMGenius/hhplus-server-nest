import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from 'src/infra/modules/database.module';
import { UserModule } from 'src/interfaces/modules/user.module';
import { TicketModule } from 'src/interfaces/modules/ticket.module';
import { PayModule } from 'src/interfaces/modules/pay.module';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, UserModule, TicketModule, PayModule],
})
export class AppModule {}
