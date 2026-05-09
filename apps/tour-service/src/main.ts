import * as process from 'process';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8081',
      'http://127.0.0.1:8081',
      /^http:\/\/192\.168\.\d{1,3}\.\d{1,3}:8081$/,
      /^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}:8081$/,
      /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}:8081$/,
      'https://autotoor.com',
      'https://www.autotoor.com',
    ],
  });
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
