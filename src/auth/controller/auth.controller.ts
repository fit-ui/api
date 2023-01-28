import {
  ClassSerializerInterceptor,
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { LocalAuthGuard } from '../guard/local.auth.guard';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }

  // @todo example of how to use the AuthGuard
  @UseGuards(AuthGuard)
  @Get('/protected')
  getHello(@Request() req) {
    return req.user;
  }
}
