import { DistanceUnit } from '@autotoor/tour-common';

import { GeoService } from '../../../src/geo';
import { COORDS_1, COORDS_2 } from '../../mock/coordinates';

describe('GeoService', () => {
  let geoService: GeoService;
  beforeEach(() => {
    geoService = new GeoService();
  });
  describe('calculateDistance', () => {
    it('should return the distance between two sets of coordinates in feet when FOOT is specified as the unit', () => {
      expect(
        geoService.calculateDistance(COORDS_1, COORDS_2, DistanceUnit.FOOT),
      ).toBe(3218.817417414344);
    });

    it('should return the distance between two sets of coordinates in miles when MILE is specified as the unit', () => {
      expect(
        geoService.calculateDistance(COORDS_1, COORDS_2, DistanceUnit.MILE),
      ).toBe(0.6096245108739289);
    });

    it('should return the distance between two sets of coordinates in meters when METER is specified as the unit', () => {
      expect(
        geoService.calculateDistance(COORDS_1, COORDS_2, DistanceUnit.METER),
      ).toBe(980.787312822677);
    });

    it('should return the distance between two sets of coordinates in km when KILOMETER is specified as the unit', () => {
      expect(
        geoService.calculateDistance(
          COORDS_1,
          COORDS_2,
          DistanceUnit.KILOMETER,
        ),
      ).toBe(0.980787312822677);
    });
  });
});
