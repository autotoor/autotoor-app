import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WikipediaClientService } from './wikipedia-client.service';
import { WikipediaLandmarkProviderService } from './wikipedia-landmark-provider.service';
import { WikipediaController } from './wikipedia.controller';

@Module({
  controllers: [WikipediaController],
  exports: [WikipediaLandmarkProviderService],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [WikipediaClientService, WikipediaLandmarkProviderService],
})
export class WikipediaModule {}
