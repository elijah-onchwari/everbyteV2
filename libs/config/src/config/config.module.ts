import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { BaseConfigService } from './base-config.service';
const providers = [
  {
    provide: 'ENV_CONFIG_OPTIONS',
    useFactory: (baseConfigService: BaseConfigService) => baseConfigService.loadEnvironmentVariables(),
    inject: [BaseConfigService],
  },
  BaseConfigService,
  ConfigService,
];
@Module({
  providers: [...providers],
  exports: [ConfigService]
})
export class ConfigModule {}
