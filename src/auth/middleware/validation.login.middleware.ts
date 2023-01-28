import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { validateOrReject } from 'class-validator';

import { LoginUserDto } from '../../user/dto/login.user.dto';

@Injectable()
export class validationLoginMiddleware implements NestMiddleware {
  async use(req: Request, _: Response, next: NextFunction) {
    const { body } = req;

    const loginUserDto = new LoginUserDto();
    const errors = [];

    Object.keys(body).forEach((key) => {
      loginUserDto[key] = body[key];
    });

    try {
      await validateOrReject(loginUserDto);
    } catch (error) {
      error.forEach((err) => {
        Object.values(err.constraints).forEach((constraint) => {
          errors.push(constraint);
        });
      });
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    next();
  }
}
