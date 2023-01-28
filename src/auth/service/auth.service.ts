import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { LoginUserDto } from '../../user/dto/login.user.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userService.findUserByEmail({ email });

    if (!user) {
      throw new ConflictException('User does not exist');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ConflictException('Invalid password');
    }

    return user;
  }
}
