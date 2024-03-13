import { Inject, Injectable } from '@nestjs/common';
import { BaseConfigService } from './base-config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RedisOptions } from 'ioredis';
import { join } from 'path';
import { EnvConfigs } from '../interfaces/config.interface';
@Injectable()
export class ConfigService {
  private readonly env: any;

  constructor(
    @Inject('ENV_CONFIG_OPTIONS')
    private readonly envConfigs: EnvConfigs,
    private readonly baseConfigs: BaseConfigService
  ) {
    this.env = this.baseConfigs.validateEnvironmentVariables(this.envConfigs);
  }

  get port(): number {
    return Number(this.env.PORT);
  }

  get dataSourceOptions(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      host: this.env.TYPEORM_HOST,
      username: this.env.TYPEORM_USERNAME,
      password: this.env.TYPEORM_PASSWORD,
      database: this.env.TYPEORM_DATABASE,
      port: this.env.TYPEORM_PORT,
      logging: 'all',
      logger: 'advanced-console',
      synchronize: false,
      uuidExtension: 'pgcrypto',
      migrationsTransactionMode: 'each',
      migrationsRun: true,
      entities: [],
      subscribers: [],
      migrations: [join(__dirname, '/*{.m.ts,.m.js}')],
    };
  }

  get redisOptions(): RedisOptions {
    return {
      host: this.env.REDIS_HOST,
      port: this.env.REDIS_PORT,
      db: this.env.REDIS_DATABASE,
    } as RedisOptions;
  }

  get isProd(): boolean {
    return Boolean(!this.env.IS_DEMO);
  }
}
