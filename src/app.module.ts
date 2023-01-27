import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MySqlConfigModule } from './config/database/config.module';
import { MySqlConfigService } from './config/database/service/mysql.config.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema as validationSchema } from './validation/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
