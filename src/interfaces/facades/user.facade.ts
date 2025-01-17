import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class UserFacade {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  async getPoint(userId: string) {
    return this.userService.getPoint(userId);
  }

  async createQueue(userId: string) {
    return this.userService.createQueue(userId);
  }

  async getQueueStatus(userId: string) {
    return this.userService.getQueueStatus(userId);
  }

  async clearQueue(userId: string) {
    return this.userService.clearQueue(userId);
  }

  async activateWaitQueues() {
    return this.userService.activateWaitQueues();
  }

  async removeExpiredQueues() {
    return this.userService.removeExpiredQueues();
  }
}
