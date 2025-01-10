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

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  async getPoint(userId: string) {
    return this.userService.getPoint(userId);
  }

  async updatePoint(userId: string, updateUserDto: UpdateUserDto) {
    return this.userService.updatePoint(userId, updateUserDto);
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
}
