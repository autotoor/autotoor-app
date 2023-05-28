import { DistanceUnit } from '@autotoor/tour-common';

import { COORDS_1, COORDS_2 } from './coordinates';
import type {
  LandmarkData,
  LandmarkSummary,
  LocalLandmarkCriteria,
} from '../../src/common';

export const LOCAL_LANDMARK_CRITERIA_1: LocalLandmarkCriteria = {
  coordinates: COORDS_1,
  distanceUnit: DistanceUnit.MILE,
  maxCount: 3,
};

export const LANDMARK_ID_1 = 'lm_1';
export const LANDMARK_ID_2 = 'lm_2';

export const LANDMARK_TITLE_1 = 'The First Landmark';

export const LANDMARK_TITLE_2 = 'The Second Landmark';

export const LANDMARK_READABLE_SUMMARY_1 = 'The First Landmark Summary';

export const LANDMARK_READABLE_SUMMARY_2 = 'The Second Landmark Summary';

export const IMG_URL_1 = 'http://img1.url';

export const IMG_URL_2 = 'http://img2.url';

export const LANDMARK_PROVIDER_1 = 'provider-1';

export const LANDMARK_SUMMARY_1: LandmarkSummary = {
  id: LANDMARK_ID_1,
  coordinates: COORDS_2,
  imageUrl: IMG_URL_1,
  title: LANDMARK_TITLE_1,
  provider: LANDMARK_PROVIDER_1,
};

export const LANDMARK_DATA_1: LandmarkData = {
  readableSummary: LANDMARK_READABLE_SUMMARY_1,
  imageUrl: IMG_URL_1,
  provider: LANDMARK_PROVIDER_1,
};
