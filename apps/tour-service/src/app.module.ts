import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { LandmarkModule } from './landmark';
import { WikipediaModule } from './wikipedia';

@Module({
  imports: [
    LandmarkModule,
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: {
          level: 'debug',
          transport: { target: 'pino-pretty', options: { singleLine: true } },
        },
      }),
    }),
    WikipediaModule,
  ],
})
export class AppModule {}
