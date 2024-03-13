import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class EnvVariables {
  @IsNumber()
  PORT!: number;

  @IsString()
  WORKFLOW_URL!: string;

  @IsString()
  APP_URL!: string;

  @IsString()
  TYPEORM_HOST!: string;

  @IsNumber()
  TYPEORM_PORT!: number;

  @IsString()
  TYPEORM_DATABASE!: string;

  @IsString()
  TYPEORM_USERNAME!: string;

  @IsString()
  TYPEORM_PASSWORD!: string;

  @IsString()
  REDIS_HOST!: string;

  @IsNumber()
  REDIS_PORT!: number;

  @IsNumber()
  REDIS_DATABASE!: number;

  @IsString()
  EMAIL_HOST!: string;

  @IsNumber()
  EMAIL_PORT!: number;

  @IsString()
  EMAIL_FROM!: string;

  @IsString()
  EMAIL_USERNAME!: string;

  @IsString()
  EMAIL_PASSWORD!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsNumber()
  JWT_TOKEN_EXPIRATION_TIME!: number;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET!: string;

  @IsNumber()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME!: number;

  @IsString()
  JWT_VERIFICATION_TOKEN_SECRET!: string;

  @IsNumber()
  JWT_VERIFICATION_TOKEN_EXPIRATION_TIME!: number;

  @IsBoolean()
  IS_DEMO!: boolean;

  @IsNumber()
  SALT_ROUNDS!: number;
}
