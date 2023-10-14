import { Coordinates } from '@autotoor/tour-common';
import { LocationObject } from 'expo-location';

export function locToCoords(location: LocationObject): Coordinates {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
