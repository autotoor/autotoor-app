import type { Coordinates, DistanceUnit } from '@autotoor/tour-common';

export interface LocalLandmarkCriteria {
  /**
   * The coordinates to search from
   */
  coordinates: Coordinates;

  /**
   * The maximum number of results
   */
  maxCount: number;

  /**
   * The unit of distance to use for the search radius and results.
   */
  distanceUnit: DistanceUnit;
}

export interface LandmarkSummary {
  /**
   * The identifier of the landmark
   */
  id: string;

  /**
   * The title of the landmark.
   */
  title: string;

  /**
   * The url of the image to display for the landmark.
   */
  imageUrl: string;

  /**
   * The coordinates of the landmark
   */
  coordinates: Coordinates;

  /**
   * The provider of landmark data
   */
  provider: string;
}

export interface LandmarkDetails {
  /**
   * The id of the landmark
   */
  id: string;

  /**
   * The title of the landmark.
   */
  title: string;

  /**
   * The url of the image to display for the landmark.
   */
  imageUrl: string;

  /**
   * The summary of the landmark to read.
   */
  readableSummary: string;

  /**
   * The location of the landmark.
   */
  coordinates: Coordinates;

  /**
   * The provider of landmark data
   */
  provider: string;
}

export interface LocalLandmarkDetails {
  landmark: LandmarkDetails;

  /**
   * The distance of the landmark from the location.
   */
  distance: number;

  /**
   * The distance unit of the distance.
   */
  distanceUnit: DistanceUnit;
}

export interface LandmarkData {
  /**
   * Url for primary landmark image
   */
  imageUrl: string;

  /**
   * The landmark provider
   */
  provider: string;

  /**
   * A readable summary about the landmark
   */
  readableSummary: string;
}

export interface LandmarkProvider {
  getLandmarkSummaries(
    criteria: LocalLandmarkCriteria,
  ): Promise<LandmarkSummary[]>;

  getLandmarkData(landmarkSummary: LandmarkSummary): Promise<LandmarkData>;
}
