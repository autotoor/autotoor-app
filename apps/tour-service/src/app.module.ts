import * as process from 'process';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
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
    ServeStaticModule.forRoot({
      rootPath: process.env.STATIC_CONTENT_PATH,
      serveRoot: '/static',
    }),
    WikipediaModule,
  ],
})
export class AppModule {}
