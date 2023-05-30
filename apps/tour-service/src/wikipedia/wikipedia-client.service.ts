import type { Coordinates } from '@autotoor/tour-common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosError } from 'axios';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, firstValueFrom } from 'rxjs';

import type {
  WikipediaNearbyCriteria,
  WikipediaPageDetails,
  WikipediaPageSummary,
  WikipediaResponse,
} from './types-internal';
import { ApplicationError } from '../common';

@Injectable()
export class WikipediaClientService {
  private readonly httpClient: HttpService;

  private readonly logger: PinoLogger;

  private static readonly WIKIPEDIA_DOMAIN = 'https://en.wikipedia.org';

  constructor(
    httpClient: HttpService,
    @InjectPinoLogger(WikipediaClientService.name) logger: PinoLogger,
  ) {
    this.httpClient = httpClient;
    this.logger = logger;
  }

  // action=query&prop=coordinates|pageimages|description|extracts&format=json&formatversion=2&pageids=27403935&explaintext`,
  /**
   * Gets details about wikipedia page with given pageId
   * @param pageId the id of the page to get the details for
   */
  public async getPageDetails(
    pageId: string,
  ): Promise<WikipediaResponse<WikipediaPageDetails>> {
    const response = await firstValueFrom(
      this.httpClient
        .get<WikipediaResponse<WikipediaPageDetails>>(
          `${WikipediaClientService.WIKIPEDIA_DOMAIN}/w/api.php?explaintext`,
          {
            params: {
              action: 'query',
              prop: 'coordinates|pageimages|description|extracts',
              piprop: 'thumbnail',
              pithumbsize: 150,
              format: 'json',
              formatversion: 2,
              pageids: pageId,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new ApplicationError(
              `Error loading details for landmark with id: ${pageId}`,
              { pageId },
              error,
            );
          }),
        ),
    );
    return response.data;
  }

  /**
   * Gets local page summaries from wikipedia for given set of coordinates and wikipediaNearbyCriteria
   * @param coordinates the coordinates to find pages near
   * @param wikipediaNearbyCriteria additional criteria
   */
  public async getLocalPageSummaries(
    coordinates: Coordinates,
    wikipediaNearbyCriteria: WikipediaNearbyCriteria,
  ): Promise<WikipediaResponse<WikipediaPageSummary>> {
    const params = {
      ...wikipediaNearbyCriteria,
      action: 'query',
      colimit: 'max',
      generator: 'geosearch',
      ggscoord: `${coordinates.latitude}|${coordinates.longitude}`,
      prop: 'coordinates|pageimages|description',
      piprop: 'thumbnail',
      pithumbsize: 150,
      format: 'json',
      formatversion: 2,
    };
    const response = await firstValueFrom(
      this.httpClient
        .get<WikipediaResponse<WikipediaPageSummary>>(
          `${WikipediaClientService.WIKIPEDIA_DOMAIN}/w/api.php?`,
          { params },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw new ApplicationError(
              `Error loading local page summaries for coordinates: ${coordinates.latitude}|${coordinates.longitude}`,
              { params },
              error,
            );
          }),
        ),
    );
    return response.data;
  }
}
