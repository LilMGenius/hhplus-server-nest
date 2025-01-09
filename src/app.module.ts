import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/interfaces/modules/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
