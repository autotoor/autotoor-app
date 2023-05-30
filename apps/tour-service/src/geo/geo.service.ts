import type { Coordinates } from '@autotoor/tour-common';
import { DistanceUnit } from '@autotoor/tour-common';
import { Injectable } from '@nestjs/common';
import geodist from 'geodist';

@Injectable()
export class GeoService {
  public calculateDistance(
    c1: Coordinates,
    c2: Coordinates,
    distanceUnit: DistanceUnit,
  ): number {
    return geodist(this.toGeoCoords(c1), this.toGeoCoords(c2), {
      unit: this.toUnits(distanceUnit),
      exact: true,
    });
  }

  private toUnits(distanceUnit: DistanceUnit): string {
    switch (distanceUnit) {
      case DistanceUnit.FOOT:
        return 'feet';
      case DistanceUnit.MILE:
        return 'miles';
      case DistanceUnit.METER:
        return 'meters';
      case DistanceUnit.KILOMETER:
        return 'kilometers';
      default:
        return 'feet';
    }
  }

  private toGeoCoords(coordinates: Coordinates): { lat: number; lon: number } {
    return {
      lat: coordinates.latitude,
      lon: coordinates.longitude,
    };
  }
}
