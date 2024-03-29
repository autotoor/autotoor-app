/* eslint-disable @typescript-eslint/no-inferrable-types */
import type { LocalLandmarkSearchCriteria } from '@autotoor/tour-common';
import { DistanceUnit } from '@autotoor/tour-common';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { CoordinatesDto } from './coordinates.dto';

export class LocalLandmarkSearchCriteriaDto
  extends CoordinatesDto
  implements LocalLandmarkSearchCriteria
{
  @IsEnum(DistanceUnit)
  @IsOptional()
  distanceUnit: DistanceUnit = DistanceUnit.MILE;

  @IsInt()
  @IsOptional()
  maxCount: number = 10;
}
