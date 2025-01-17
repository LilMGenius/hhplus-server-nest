import { Global, Module } from '@nestjs/common';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
