import { Controller, Get, Param, Query } from '@nestjs/common';

import { WikipediaClientService } from './wikipedia-client.service';
import { WikipediaLandmarkProviderService } from './wikipedia-landmark-provider.service';

@Controller('wikipedia/v1')
export class WikipediaController {
  private wikipediaClient: WikipediaClientService;

  private wikipediaLandmarkProvider: WikipediaLandmarkProviderService;

  constructor(
    wikipediaClient: WikipediaClientService,
    wikipediaLandmarkProvider: WikipediaLandmarkProviderService,
  ) {
    this.wikipediaClient = wikipediaClient;
    this.wikipediaLandmarkProvider = wikipediaLandmarkProvider;
  }

  @Get('page/:id')
  public async getPageDetails(@Param('id') pageId: string): Promise<object> {
    return this.wikipediaClient.getPageDetails(pageId);
  }

  @Get('page-summaries')
  public async getLocalPageSummaries(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number,
    @Query('limit') limit: number,
  ): Promise<object> {
    return this.wikipediaClient.getLocalPageSummaries(
      { latitude, longitude },
      { ggslimit: limit, ggsradius: radius },
    );
  }
}
