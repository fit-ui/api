import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './../dto/create.user.dto';
import { UserEntity } from './../entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userRepository: Repository<UserEntity>;
  let userService: UserService;

  let createUserDto: CreateUserDto;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);

    createUserDto = {
      email: 'fit-ui@gmail.com',
      password: 'fit-ui',
      username: 'fit-ui',
    };
  });

  describe('create', () => {
    it('user already exists', async () => {
      jest
        .spyOn(userService, 'findUserByUniqueProperty')
        .mockReturnValueOnce(
          Promise.resolve(createUserDto) as Promise<UserEntity>,
        );

      await expect(async () => {
        await userService.create(createUserDto);
      }).rejects.toThrowError(new ConflictException('User already exists'));
    });

    it('when creating a user, user information must be returned', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockReturnValueOnce(
          Promise.resolve(createUserDto) as Promise<UserEntity>,
        );

      expect(await userService.create(createUserDto)).toBe(createUserDto);
    });
  });
});
