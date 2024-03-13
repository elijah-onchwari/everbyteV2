import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvVariables } from './env.variables';

@Injectable()
export class BaseConfigService {
  /**
   * Loads the environment variables from the .env file
   * @returns the parsed environment variables
   */
  loadEnvironmentVariables() {
    const configs: Record<string, unknown> = {
      PORT: process.env['PORT'] ?? 3000,
      WORKFLOW_URL: process.env['WORKFLOW_URL'] ?? 'http://localhost:3000',
      APP_URL: process.env['APP_URL'] ?? 'http://localhost:4200',
      TYPEORM_HOST: process.env['TYPEORM_HOST'] ?? 'localhost',
      TYPEORM_PORT: parseInt(process.env['TYPEORM_PORT'] as string) ?? 5432,
      TYPEORM_DATABASE: process.env['TYPEORM_DATABASE'] ?? 'everbyte',
      TYPEORM_USERNAME: process.env['TYPEORM_USERNAME'] ?? 'postgres',
      TYPEORM_PASSWORD: process.env['TYPEORM_PASSWORD'] ?? 'postgres',
      REDIS_HOST: process.env['REDIS_HOST'] ?? 'localhost',
      REDIS_PORT: parseInt(process.env['REDIS_PORT'] as string, 10) ?? 6379,
      REDIS_DATABASE: parseInt(process.env['REDIS_DATABASE'] as string, 10) ?? 0,
      EMAIL_HOST: process.env['EMAIL_HOST'] ?? 'smtp.gmail.com',
      EMAIL_PORT: parseInt(process.env['EMAIL_PORT'] as string, 10) ?? 587,
      EMAIL_FROM: process.env['EMAIL_FROM'] ?? 'no-reply@everbyte.io',
      EMAIL_USERNAME: process.env['EMAIL_USERNAME'],
      EMAIL_PASSWORD: process.env['EMAIL_PASSWORD'],
      JWT_SECRET: process.env['JWT_SECRET'] ?? 'secret',
      JWT_TOKEN_EXPIRATION_TIME: parseInt(process.env['JWT_TOKEN_EXPIRATION_TIME'] as string, 10) ?? 86400,
      JWT_REFRESH_TOKEN_SECRET: process.env['JWT_REFRESH_TOKEN_SECRET'] ?? 'refreshSecretKey',
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: parseInt(process.env['JWT_REFRESH_TOKEN_EXPIRATION_TIME'] as string, 10) ?? 86400 * 7,
      JWT_VERIFICATION_TOKEN_SECRET: process.env['JWT_VERIFICATION_TOKEN_SECRET'] ?? 'verification',
      JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: parseInt(process.env['JWT_VERIFICATION_TOKEN_EXPIRATION_TIME'] as string, 10) ?? 86400,
      IS_DEMO: Boolean(process.env['IS_DEMO']) ?? false,
      SALT_ROUNDS: parseInt(process.env['SALT_ROUNDS'] as string, 10) ?? 12,
    };
    //TODO add secret manager

    return configs;
  }

  /**
   * Ensures all needed variables are set,
   * and returns the validated JavaScript object
   * including the applied default values.
   */

  validateEnvironmentVariables(config: Record<string, unknown>) {
    console.info('🚀 ~ BaseConfigService ~ validateEnvironmentVariables ~ config:', config);
    const validatedConfig = plainToInstance(EnvVariables, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      Logger.error(`Application shutting down`);
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
