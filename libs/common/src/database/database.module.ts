import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { TENV } from 'apps/orders/src/env.validate';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (
        configService: ConfigService<TENV>,
      ):
        | Promise<MongooseModuleFactoryOptions>
        | MongooseModuleFactoryOptions => {
        console.log('uri:', configService.get('MONGODB_URI'));
        const option: MongooseModuleFactoryOptions = {
          uri: configService.get<string>('MONGODB_URI'),
          retryAttempts: 5,
        };
        return option;
      },
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb://root:password123@mongodb-primary:27017'),
  ],
})
export class DatabaseModule {}
