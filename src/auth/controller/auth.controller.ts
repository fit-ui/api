import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  // @todo example of how to use the LocalAuthGuard
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return {
      msg: 'Logged in!',
    };
  }

  // @todo example of how to use the AuthGuard
  @UseGuards(AuthGuard)
  @Get('/protected')
  getHello(@Request() req) {
    return req.user;
  }
}
