import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type {
  WikipediaPageDetails,
  WikipediaPageSummary,
  WikipediaResponse,
} from './types-internal';
import { WikipediaClientService } from './wikipedia-client.service';
import type {
  LandmarkData,
  LandmarkProvider,
  LandmarkSummary,
  LocalLandmarkCriteria,
} from '../common';

export class WikipediaLandmarkProviderService implements LandmarkProvider {
  private readonly logger: PinoLogger;

  private readonly wikipediaClient: WikipediaClientService;

  private static readonly providerName: 'wikipedia';

  constructor(
    @InjectPinoLogger(WikipediaLandmarkProviderService.name) logger: PinoLogger,
    wikipediaClient: WikipediaClientService,
  ) {
    this.logger = logger;
    this.wikipediaClient = wikipediaClient;
  }

  public async getLandmarkData(
    landmarkSummary: LandmarkSummary,
  ): Promise<LandmarkData> {
    const response: WikipediaResponse<WikipediaPageDetails> =
      await this.wikipediaClient.getPageDetails(landmarkSummary.id);
    const summaryText =
      response.query.pages.length > 0 ? response.query.pages[0].extract : '';

    return {
      imageUrl: landmarkSummary.imageUrl,
      provider: WikipediaLandmarkProviderService.providerName,
      readableSummary: summaryText,
    };
  }

  public async getLandmarkSummaries(
    criteria: LocalLandmarkCriteria,
  ): Promise<LandmarkSummary[]> {
    this.logger.debug({ criteria }, 'Getting landmark summaries for criteria');
    const { coordinates, maxCount } = criteria;
    const response: WikipediaResponse<WikipediaPageSummary> =
      await this.wikipediaClient.getLocalPageSummaries(coordinates, {
        ggslimit: maxCount,
        ggsradius: 10000,
      });

    this.logger.debug(
      { criteria, response },
      `Received ${response?.query?.pages?.length} nearby wikipedia pages`,
    );

    return response.query.pages.map((pageSummary) =>
      this.pageSummaryToLandmarkSummary(pageSummary),
    );
  }

  private pageSummaryToLandmarkSummary(
    pageSummary: WikipediaPageSummary,
  ): LandmarkSummary {
    return {
      id: pageSummary.pageid.toString(),
      provider: WikipediaLandmarkProviderService.providerName,
      imageUrl: pageSummary.thumbnail?.source,
      coordinates: {
        latitude: pageSummary.coordinates[0].lat,
        longitude: pageSummary.coordinates[0].lon,
      },
      title: pageSummary.title,
    };
  }
}
