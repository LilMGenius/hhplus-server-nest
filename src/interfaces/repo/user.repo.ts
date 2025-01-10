import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/interfaces/entities/user.entity';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/app/user/dto/update-user.dto';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.repo.create(createUserDto);
    return this.repo.save(newUser);
  }

  async findById(userId: string): Promise<User | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.userName = updateUserDto.userName ?? user.userName;
    user.point = updateUserDto.point ?? user.point;
    return this.repo.save(user);
  }
}
