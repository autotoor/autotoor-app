import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { LandmarkModule } from './landmark';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    LandmarkModule,
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          level: 'debug',
          transport: { target: 'pino-pretty', options: { singleLine: true } },
        },
      }),
    }),
  ],
})
export class AppModule {}
