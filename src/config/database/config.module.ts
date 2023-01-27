import { Module } from '@nestjs/common';

import { MySqlConfigService } from './service/mysql.config.service';

@Module({
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
