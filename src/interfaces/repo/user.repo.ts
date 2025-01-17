import { Injectable } from '@nestjs/common';
import { LoggerService } from 'src/interfaces/http/middlewares/logger/logger.service';
import { Repository, EntityManager } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/interfaces/entities/user.entity';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';

@Injectable()
export class UserRepo {
  constructor(
    private readonly logger: LoggerService,

    @InjectRepository(User)
    private readonly repo: Repository<User>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.repo.create(createUserDto);
    return this.repo.save(newUser);
  }

  async findById(userId: string): Promise<User | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const MAX_RETRIES = 5;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
      try {
        return await this.entityManager.transaction(async (manager) => {
          const user = await manager.findOne(User, {
            where: { userId: updateUserDto.userId },
            lock: { mode: 'pessimistic_write' },
          });

          if (!user) {
            throw new Error('User not found');
          }

          user.userName = updateUserDto.userName ?? user.userName;
          user.point = updateUserDto.point ?? user.point;

          return manager.save(user);
        });
      } catch (error) {
        this.logger.error(error);
        if (error.code === 'ER_LOCK_DEADLOCK' || error.message.includes('deadlock')) {
          attempt++;
          const delay = Math.floor(Math.random() * 500) + 500; // Random delay between 500ms and 1000ms
          this.logger.warn(`Deadlock detected. Retrying after ${delay}ms... (attempt ${attempt})`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }

    throw new Error('Transaction failed after multiple retries due to deadlock.');
  }
}
