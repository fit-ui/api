import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateUserDto } from './../dto/create.user.dto';
import { UserEntity } from './../entities/user.entity';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;

  let createUserDto: CreateUserDto;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
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
    userController = module.get<UserController>(UserController);

    createUserDto = {
      email: 'fit-ui@gmail.com',
      password: 'fit-ui',
      username: 'fit-ui',
    };
  });

  describe('create', () => {
    it('when creating a user, user information must be returned', async () => {
      jest
        .spyOn(userService, 'create')
        .mockReturnValueOnce(
          Promise.resolve(createUserDto) as Promise<UserEntity>,
        );

      expect(await userController.create(createUserDto)).toBe(createUserDto);
    });
  });
});
