import * as process from 'process';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add a global prefix to all routes
  app.setGlobalPrefix('/api/tour');

  // Enable pino logger
  app.useLogger(app.get(Logger));

  // Add validation and class transformation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT || 3333);
}
bootstrap();
