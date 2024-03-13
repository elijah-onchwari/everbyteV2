/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@everbyte/config';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const configs = app.select(ConfigModule).get(ConfigService);
  console.log("🚀 ~ bootstrap ~ configs:", configs.isProd)
  
  const environment = configs.isProd ? 'Production' : 'Development';
  const options = new DocumentBuilder().setTitle('Workflow API').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configs.port, () => {
    Logger.log(' ');
    Logger.log('Listening at      : http://localhost:' + configs.port);
    Logger.log(`Environment       : ${environment} mode`);
    Logger.log(' ');
    Logger.log(`Postgres Host     : ${configs.dataSourceOptions.host}`);
    Logger.log(`Postgres Port     : ${configs.dataSourceOptions.port}`);
    Logger.log(`Postgres Database : ${configs.dataSourceOptions.database}`);
    Logger.log(' ');
    Logger.log(`Redis Host        : ${configs.redisOptions.host}:${configs.redisOptions.port}`);
  });
  return app;
}

bootstrap();
