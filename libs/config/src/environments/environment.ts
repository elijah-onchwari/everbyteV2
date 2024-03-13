import { join } from 'path';
import { AppConfiguration } from '../interfaces/config.interface';

export const environment: AppConfiguration = {
  app: {
    environment: 'development',
  },
  postgres: {
    type: 'postgres',
    username: process.env['TYPEORM_USERNAME'] ?? 'postgres',
    password: process.env['TYPEORM_PASSWORD'] ?? 'postgres',
    database: process.env['TYPEORM_DATABASE'] ?? 'everbyte',
    port: parseInt(process.env['TYPEORM_PORT'] as string, 10) ?? 5432,
    logging: 'all',
    logger: 'file',
    synchronize: false,
    uuidExtension: 'pgcrypto',
    migrationsTransactionMode: 'each',
    migrationsRun: true,
    entities: [],
    subscribers: [],
    migrations: [join(__dirname, '../../../../dist/apps/workflow-api/*{.m.ts,.m.js}')],
    cli: {
      migrationsDir: join(__dirname, '../../../workflow-data/src/migrations/migrations*{.m.ts,.m.js}'),
    },
  },
  redis: {
    host: process.env['REDIS_HOST'],
    port: parseInt(process.env['REDIS_PORT'] as string, 10) ?? 6379,
    db: parseInt(process.env['REDIS_DATABASE'] as string, 10) ?? 0,
  },
};
