import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/interfaces/http/middlewares/logger/logger.module';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/interfaces/entities/user.entity';
import { Queue } from 'src/interfaces/entities/queue.entity';
import { UserController } from 'src/interfaces/http/controllers/user.controller';
import { UserFacade } from 'src/interfaces/facades/user.facade';
import { UserService } from 'src/app/user/user.service';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { QueueScheduler } from 'src/interfaces/schedulers/queue.scheduler';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([User, Queue])],
  controllers: [UserController],
  providers: [LoggerService, UserFacade, UserService, UserRepo, QueueRepo, QueueScheduler],
  exports: [UserFacade],
})
export class UserModule {}
