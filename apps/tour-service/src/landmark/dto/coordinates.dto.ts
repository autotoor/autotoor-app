import { Coordinates } from '@autotoor/tour-common';
import { IsNumber } from 'class-validator';

export class CoordinatesDto implements Coordinates {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
