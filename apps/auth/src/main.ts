import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { TEnvAuth } from './env.validate';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // await app.listen(3000);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOption('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get<ConfigService<TEnvAuth>>(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
