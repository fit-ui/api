import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { LoginUserDto } from '../../user/dto/login.user.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { UserService } from '../../user/service/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  let loginUserDto: LoginUserDto;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
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

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);

    loginUserDto = {
      email: 'fit-ui@gmail.com',
      password: 'fit-ui',
    };
  });

  describe('login', () => {
    it('if you do not have a registered email', async () => {
      jest
        .spyOn(userService, 'findUserByEmail')
        .mockReturnValueOnce(Promise.resolve(null) as Promise<UserEntity>);

      await expect(async () => {
        await authService.login(loginUserDto);
      }).rejects.toThrowError(new ConflictException('User does not exist'));
    });
    // @todo add more tests
  });
});
