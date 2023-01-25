import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';

const { PORT, SESSION_SECRET: secret } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const maxAge = 24 * 60 * 60 * 1000; // 1 day

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT ? parseInt(PORT) : 3000);
}

bootstrap();
