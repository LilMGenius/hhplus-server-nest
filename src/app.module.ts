import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TicketsModule } from './tickets/tickets.module';
import { BalanceModule } from './balance/balance.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [DatabaseModule, TicketsModule, BalanceModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
