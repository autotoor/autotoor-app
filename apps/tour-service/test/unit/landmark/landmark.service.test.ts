import { DistanceUnit } from '@autotoor/tour-common';
import type { PinoLogger } from 'nestjs-pino';
import { anything, instance, mock, reset, when } from 'ts-mockito';

import type { LocalLandmarkDetails } from '../../../src/common';
import { ApplicationError } from '../../../src/common';
import type { GeoService } from '../../../src/geo';
import { LandmarkService } from '../../../src/landmark/landmark.service';
import type { WikipediaLandmarkProviderService } from '../../../src/wikipedia';
import {
  LANDMARK_DATA_1,
  LANDMARK_SUMMARY_1,
  LOCAL_LANDMARK_CRITERIA_1,
} from '../../mock/landmark';

describe('LandmarkService', () => {
  let landmarkService: LandmarkService;

  const geoService: GeoService = mock();

  const logger: PinoLogger = mock();

  const wikipediaProvider: WikipediaLandmarkProviderService = mock();

  beforeEach(() => {
    reset(geoService);
    reset(logger);
    reset(wikipediaProvider);

    landmarkService = new LandmarkService(
      instance(geoService),
      instance(logger),
      instance(wikipediaProvider),
    );
  });

  describe('toLocalLandmark', () => {
    it('should return a local landmark when landmark details are fetched successfully', async () => {
      when(
        geoService.calculateDistance(
          anything(),
          anything(),
          LOCAL_LANDMARK_CRITERIA_1.distanceUnit,
        ),
      ).thenReturn(12345);
      when(wikipediaProvider.getLandmarkData(LANDMARK_SUMMARY_1)).thenResolve(
        LANDMARK_DATA_1,
      );

      const localLandmark = await landmarkService.toLocalLandmark(
        LOCAL_LANDMARK_CRITERIA_1,
        LANDMARK_SUMMARY_1,
      );

      const expected: LocalLandmarkDetails = {
        distance: 12345,
        distanceUnit: DistanceUnit.MILE,
        landmark: {
          id: LANDMARK_SUMMARY_1.id,
          coordinates: LANDMARK_SUMMARY_1.coordinates,
          imageUrl: LANDMARK_SUMMARY_1.imageUrl,
          provider: LANDMARK_DATA_1.provider,
          readableSummary: LANDMARK_DATA_1.readableSummary,
          title: LANDMARK_SUMMARY_1.title,
          url: LANDMARK_DATA_1.url,
        },
      };
      expect(localLandmark).toMatchObject(expected);
    });
  });

  it('should return null if an error is thrown', async () => {
    when(
      geoService.calculateDistance(
        anything(),
        anything(),
        LOCAL_LANDMARK_CRITERIA_1.distanceUnit,
      ),
    ).thenReturn(12345);
    when(wikipediaProvider.getLandmarkData(LANDMARK_SUMMARY_1)).thenThrow(
      new ApplicationError('Something'),
    );

    const localLandmark = await landmarkService.toLocalLandmark(
      LOCAL_LANDMARK_CRITERIA_1,
      LANDMARK_SUMMARY_1,
    );

    expect(localLandmark).toBeNull();
  });
});
