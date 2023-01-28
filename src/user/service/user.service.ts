import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    if (await this.findUserByUniqueProperty({ email, username })) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);

    await user.save();

    return user;
  }

  async findUserByUniqueProperty({ email, username }) {
    return this.userRepository.findOne({
      where: [
        {
          email,
        },
        {
          username,
        },
      ],
    });
  }

  async findUserByEmail({ email }) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
