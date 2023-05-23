import { DistanceUnit, Coordinates } from "../common";
export interface Landmark {
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
  summary: string;

  /**
   * The location of the landmark.
   */
  coordinates: Coordinates;
}

export interface LocalLandmark {
  landmark: Landmark;

  /**
   * The distance of the landmark from the location.
   */
  distance: number;

  /**
   * The distance unit of the distance.
   */
  distanceUnit: DistanceUnit;
}

/**
 * Criteria for searching landmarks.
 */
export interface LocalLandmarkSearchCriteria extends Coordinates {

  /**
   * The maximum number of results
   */
  maxCount: number;

  /**
   * The unit of distance to use for the search radius and results.
   */
  distanceUnit: DistanceUnit;
}