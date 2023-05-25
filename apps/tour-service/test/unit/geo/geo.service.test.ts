import { Coordinates, DistanceUnit } from '@autotoor/tour-common';

import { GeoService } from '../../../src/geo/geo.service';

describe('GeoService', () => {
  let geoService: GeoService;
  const c1: Coordinates = {
    latitude: 39.2663886,
    longitude: -121.02655320000001,
  };

  const c2: Coordinates = {
    latitude: 39.263399,
    longitude: -121.015835,
  };

  beforeEach(() => {
    geoService = new GeoService();
  });
  describe('calculateDistance', () => {
    it('should return the distance between two sets of coordinates in feet when FOOT is specified as the unit', () => {
      expect(geoService.calculateDistance(c1, c2, DistanceUnit.FOOT)).toBe(
        3218.817417414344,
      );
    });

    it('should return the distance between two sets of coordinates in miles when MILE is specified as the unit', () => {
      expect(geoService.calculateDistance(c1, c2, DistanceUnit.MILE)).toBe(
        0.6096245108739289,
      );
    });

    it('should return the distance between two sets of coordinates in meters when METER is specified as the unit', () => {
      expect(geoService.calculateDistance(c1, c2, DistanceUnit.METER)).toBe(
        980.787312822677,
      );
    });

    it('should return the distance between two sets of coordinates in km when KILOMETER is specified as the unit', () => {
      expect(geoService.calculateDistance(c1, c2, DistanceUnit.KILOMETER)).toBe(
        0.980787312822677,
      );
    });
  });
});
