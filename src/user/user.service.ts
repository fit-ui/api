import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // @todo check if user already exists
    const user = this.userRepository.create(createUserDto);

    await user.save();

    delete user.password;

    return user;
  }

  async findOne(email: string): Promise<any> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
