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

  private static readonly PROVIDER_NAME: 'wikipedia';

  private static readonly CHARACTER_LIMIT: number = 3999;

  private static readonly WIKIPEDIA_PAGE_PREFIX =
    'https://en.wikipedia.org/wiki/';

  constructor(
    @InjectPinoLogger(WikipediaLandmarkProviderService.name) logger: PinoLogger,
    wikipediaClient: WikipediaClientService,
  ) {
    this.logger = logger;
    this.wikipediaClient = wikipediaClient;
  }

  public async getLandmarkData(
    landmarkSummary: LandmarkSummary,
  ): Promise<LandmarkData | null> {
    const response: WikipediaResponse<WikipediaPageDetails> =
      await this.wikipediaClient.getPageDetails(landmarkSummary.id);

    if (!response.query.pages || response.query.pages.length === 0) return null;

    const pageDetails: WikipediaPageDetails = response.query.pages[0];

    this.logger.debug(
      `Processing WikipediaPageDetails data for ${pageDetails.title}`,
    );

    const summaryText = pageDetails.extract;

    const readableSummary = await this.cleanupSummary(summaryText);

    const url = this.getUrl(pageDetails.title);

    const imageUrl = this.toImageUrl(landmarkSummary.imageUrl);

    return {
      imageUrl,
      provider: WikipediaLandmarkProviderService.PROVIDER_NAME,
      readableSummary,
      url,
    };
  }

  public toImageUrl(thumbnail?: string): string | undefined {
    if (!thumbnail) return undefined;
    if (thumbnail.endsWith('.svg.png')) return thumbnail;
    const imageUrl = thumbnail
      .replace(/\/thumb\//, '/')
      .replace(/\/[^/]*$/, '');
    return imageUrl;
  }

  /**
   * Cleans up the summary text to optimize for reading
   * @param summaryText the raw summary text from wikipedia
   * @private
   */
  private async cleanupSummary(summaryText: string): Promise<string> {
    // only include up to == See also == or == Images == section at the most
    const parts: string[] = summaryText.split(
      /\n{3}(== See also ==|== Images ==)\n/,
    );
    // split out section headers that look like /n/n== Section Header ==/n/n
    const cleanedParts: string[] = parts[0].split(/\n*={2,}\s.*?\s=+\n/g); // /\n*={2,}\s[\w\s,]+\s=+\n/g);
    // Only include sections before the character limit is reached and the first one that goes over
    const cleanedAndSplitParts: string[] = cleanedParts
      .flatMap((part) => part.split(/\n\n/g))
      .map((part) => part.replace(/\n== .+ ==/g, '').trim());
    let characterCount = 0;
    const allowedParts: string[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cleanedAndSplitParts.length; i++) {
      characterCount += cleanedAndSplitParts[i].length;
      if (characterCount > WikipediaLandmarkProviderService.CHARACTER_LIMIT) {
        break;
      }
      allowedParts.push(cleanedAndSplitParts[i]);
    }
    return allowedParts.join(' ');
  }

  public async getLandmarkSummaries(
    criteria: LocalLandmarkCriteria,
  ): Promise<LandmarkSummary[]> {
    this.logger.debug({ criteria }, 'Getting landmark summaries for criteria');
    const { coordinates, maxCount } = criteria;
    try {
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
    } catch (error) {
      this.logger.warn(
        { error },
        `Error getting landmark summaries for coordinates: latitude: ${coordinates?.latitude}, longitude: ${coordinates?.longitude}`,
      );
      return [];
    }
  }

  private pageSummaryToLandmarkSummary(
    pageSummary: WikipediaPageSummary,
  ): LandmarkSummary {
    return {
      id: pageSummary.pageid.toString(),
      provider: WikipediaLandmarkProviderService.PROVIDER_NAME,
      imageUrl: pageSummary.thumbnail?.source,
      coordinates: {
        latitude: pageSummary.coordinates[0].lat,
        longitude: pageSummary.coordinates[0].lon,
      },
      title: pageSummary.title,
    };
  }

  private getUrl(title: string): string {
    const formattedTitle = title.split(' ').join('_');
    return `${WikipediaLandmarkProviderService.WIKIPEDIA_PAGE_PREFIX}${formattedTitle}`;
  }
}
