import { Module, Type } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@everbyte/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, EntitySchema, EntitySubscriberInterface } from 'typeorm';
import { entities, subscribers } from '@everbyte/workflow-data';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = {
          ...configService.dataSourceOptions,
          entities: entities as unknown as Array<Type<EntitySchema>>,
          subscribers: subscribers as Array<Type<EntitySubscriberInterface>>,
        };
        console.log('🚀 ~ useFactory: ~ options:', options);
        return configService.dataSourceOptions;
      },
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
