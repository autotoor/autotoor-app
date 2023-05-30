import type { Coordinates } from '@autotoor/tour-common';
import { IsNumber, Max, Min } from 'class-validator';

export class CoordinatesDto implements Coordinates {
  @IsNumber()
  @Max(90)
  @Min(-90)
  latitude: number;

  @IsNumber()
  @Max(180)
  @Min(-180)
  longitude: number;
}
