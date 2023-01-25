import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);

    if (!user) return null;

    const isValidatePassword = await bcrypt.compare(password, user.password);

    if (isValidatePassword) {
      const { password, username, ...rest } = user;

      return rest;
    }

    return null;
  }
}
