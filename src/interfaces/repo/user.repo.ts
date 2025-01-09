import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/interfaces/entities/user.entity';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  async findById(userId: string): Promise<User | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async update(userId: string, user: Partial<User>): Promise<User> {
    await this.repo.update(userId, user);
    return this.findById(userId);
  }
}
