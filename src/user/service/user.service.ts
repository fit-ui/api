import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';

import { UserInterface } from '../interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // @todo check if user already exists
    const user = this.userRepository.create(createUserDto);

    await user.save();

    delete user.password;

    return user;
  }

  async findOne(email: string): Promise<UserInterface> {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
