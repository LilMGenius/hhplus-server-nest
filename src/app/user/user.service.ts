import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';
import { UserRepo } from 'src/interfaces/repo/user.repo';
import { QueueRepo } from 'src/interfaces/repo/queue.repo';
import { QueueStatus } from 'src/shared/const/enum.const';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly queueRepo: QueueRepo,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  async getPoint(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    return user.point;
  }

  async updatePoint(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');
    user.point = updateUserDto.point;
    return this.userRepo.update(userId, user);
  }

  async createQueue(userId: string) {
    const queue = await this.queueRepo.create({
      userId,
      queueStatus: QueueStatus.WAIT,
      createdAt: new Date(),
      expiredAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    return queue;
  }

  async getQueueStatus(userId: string) {
    return this.queueRepo.findByUserId(userId);
  }

  async clearQueue(userId: string) {
    return this.queueRepo.deleteByUserId(userId);
  }
}
