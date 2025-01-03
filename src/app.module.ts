import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [DatabaseModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
