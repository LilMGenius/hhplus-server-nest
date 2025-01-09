import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../http/controllers/user.controller';
import { UserFacade } from 'src/interfaces/facades/user.facade';
import { UserService } from 'src/app/user/user.service';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { User } from 'src/interfaces/entities/user.entity';
import { Queue } from 'src/interfaces/entities/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Queue])],
  controllers: [UserController],
  providers: [UserFacade, UserService, UserRepo, QueueRepo],
  exports: [UserFacade],
})
export class UserModule {}
