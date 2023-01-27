import { Module } from '@nestjs/common';

import { MySqlConfigService } from './service/config.service';

@Module({
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
