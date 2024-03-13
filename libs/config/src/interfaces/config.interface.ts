import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisOptions } from 'ioredis';

/**
 * Environment configuration
 * @property {boolean} production - Is Production Environment
 * @property {boolean} demo - Is Demo Environment
 * @property {number} port - API Port
 * @property {string} appUrl - API URL
 * @property {string} clientUrl - Client URL
 * @property {number} saltRounds - Salt rounds
 * @property {EmailConfig} email - Email configuration
 * @property {string} jwtSecret - JWT secret
 * @property {number} jwtTokenExpirationTime - JWT token expiration time
 * @property {string} jwtRefreshTokenSecret - JWT refresh token secret
 * @property {number} jwtRefreshTokenExpirationTime - JWT refresh token expiration time
 * @property {string} jwtVerificationTokenSecret - JWT verification token secret
 * @property {number} jwtVerificationTokenExpirationTime - JWT verification token expiration time
 * @property {number} jwtEmailResetExpirationTime - JWT email reset expiration time
 *
 */
export interface IEnvironment {
  production: boolean;
  demo: boolean;
  port: number;
  appUrl: string;
  clientUrl: string;
  saltRounds: number;
  email: EmailConfig;
  jwtSecret: string;
  jwtTokenExpirationTime: number;
  jwtRefreshTokenSecret: string;
  jwtRefreshTokenExpirationTime: number;
  jwtVerificationTokenSecret: string;
  jwtVerificationTokenExpirationTime: number;
  jwtEmailResetExpirationTime: number;
}

/**
 * Email configuration
 * @property {string} host - Host name
 * @property {number} port - Port to connect to
 * @property {boolean} secure - Email secure
 * @property {object} auth - Authentication object
 * @property {string} fromAddress - Email from address
 */
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth?: EmailAuth;
  fromAddress?: string;
}

/**
 * Email auth
 * @property {string} user - Email username
 * @property {string} pass - Email password
 */
export interface EmailAuth {
  user: string;
  pass: string;
}

export interface EnvConfigs {
  [key: string]: string;
}

/**
 * Application configuration
 * @property {number} port - API Port
 * @property {TypeOrmModuleOptions} dataSourceOptions - TypeORM configuration
 * @property {RedisOptions} redisOptions - Redis configuration
 * @property {ILogger} logger - Logger
 */
export interface AppConfiguration {
  app: AppConfigs;
  postgres: CustomTypeOrmModuleOptions;
  redis: RedisOptions;
  logger?: ILogger;
}
/**
 * Custom TypeORM module options
 */
type CustomTypeOrmModuleOptions = TypeOrmModuleOptions & { cli: migrationsDir };

/**
 * migrationsDir
 * @property {string} migrationsDir - Migrations directory
 */
export interface migrationsDir {
  migrationsDir: string;
}

/**
 * Application configuration
 * @property {string} environment - Environment
 */
export interface AppConfigs {
  environment: string;
}

/**
 * Logger interface
 * @property {function} log - Log message
 * @property {function} error - Log error
 * @property {function} warn - Log warning
 * @property {function} debug - Log debug
 * @property {function} verbose - Log verbose
 */

export interface ILogger {
  log(message: any, context?: string): any;
  error(message: any, trace?: string, context?: string): any;
  warn(message: any, context?: string): any;
  debug?(message: any, context?: string): any;
  verbose?(message: any, context?: string): any;
}
