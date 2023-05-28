import type { LocalLandmark } from '@autotoor/tour-common';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import pMap from 'p-map';

import type {
  LandmarkData,
  LandmarkSummary,
  LocalLandmarkCriteria,
  LocalLandmarkDetails,
} from '../common';
import { GeoService } from '../geo';
import { WikipediaLandmarkProviderService } from '../wikipedia';

@Injectable()
export class LandmarkService {
  private readonly geoService: GeoService;

  private readonly logger: PinoLogger;

  private readonly wikipediaLandmarkProvider: WikipediaLandmarkProviderService;

  constructor(
    geoService: GeoService,
    @InjectPinoLogger(LandmarkService.name) logger: PinoLogger,
    wikipediaLandmarkProvider: WikipediaLandmarkProviderService,
  ) {
    this.geoService = geoService;
    this.logger = logger;
    this.wikipediaLandmarkProvider = wikipediaLandmarkProvider;
  }

  /**
   * Gets Local Landmarks
   * @param criteria the criteria to use to look up local landmarks
   */
  public async getLocalLandmarks(
    criteria: LocalLandmarkCriteria,
  ): Promise<LocalLandmarkDetails[]> {
    const landmarkSummaries: LandmarkSummary[] =
      await this.wikipediaLandmarkProvider.getLandmarkSummaries(criteria);

    this.logger.debug(
      `Received ${landmarkSummaries.length} landmark summaries`,
    );

    const landmarks: LocalLandmark[] = await pMap(
      landmarkSummaries,
      async (summary) => this.toLocalLandmark(criteria, summary),
      { concurrency: 3 },
    );

    return landmarks.filter((element) => element !== null);
  }

  /**
   * Getlocal landmark from LandmarkSummary
   * @param criteria the LocalLandmarkCriteria used to look up landmarkSummary
   * @param landmarkSummary the landmark summary
   */
  public async toLocalLandmark(
    criteria: LocalLandmarkCriteria,
    landmarkSummary: LandmarkSummary,
  ): Promise<LocalLandmarkDetails | null> {
    const { coordinates, distanceUnit } = criteria;
    try {
      const distance: number = this.geoService.calculateDistance(
        coordinates,
        landmarkSummary.coordinates,
        distanceUnit,
      );

      const landmarkData: LandmarkData =
        await this.wikipediaLandmarkProvider.getLandmarkData(landmarkSummary);

      return {
        landmark: {
          ...landmarkSummary,
          ...landmarkData,
        },
        distance,
        distanceUnit,
      };
    } catch (e) {
      this.logger.warn(
        `Error loading landmark details for landmark with id: ${landmarkSummary.id}`,
      );
      return null;
    }
  }
}
