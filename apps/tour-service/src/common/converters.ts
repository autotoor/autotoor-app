import type {
  Landmark,
  LocalLandmark,
  LocalLandmarkSearchCriteria,
} from '@autotoor/tour-common';

import type {
  LandmarkDetails,
  LocalLandmarkCriteria,
  LocalLandmarkDetails,
} from './types';

/**
 * Converts external LocalLandmarkSearchCriteria to internal LocalLandmarkCriteria
 * @param criteria the criteria to convert
 */
export function localLandmarkSearchCriteriaToInternal(
  criteria: LocalLandmarkSearchCriteria,
): LocalLandmarkCriteria {
  return {
    coordinates: {
      latitude: criteria.latitude,
      longitude: criteria.longitude,
    },
    maxCount: criteria.maxCount,
    distanceUnit: criteria.distanceUnit,
  };
}

/**
 * Converts from internal LandmarkDetails to external Landmark
 * @param landmark the LandmarkDetails to convert
 */
function internalToLandmark(landmark: LandmarkDetails): Landmark {
  return {
    id: landmark.id,
    title: landmark.title,
    provider: landmark.provider,
    readableSummary: landmark.readableSummary,
    coordinates: landmark.coordinates,
    imageUrl: landmark.imageUrl,
  };
}

/**
 * Converts from internal LocalLandmarkDetails to external LocalLandmark
 * @param landmark the LocalLandmarkDetails to convert
 */
export function internalToLocalLandmark(
  landmark: LocalLandmarkDetails,
): LocalLandmark {
  return {
    distance: landmark.distance,
    distanceUnit: landmark.distanceUnit,
    landmark: internalToLandmark(landmark.landmark),
  };
}
