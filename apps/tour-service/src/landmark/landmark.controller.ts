import type { LocalLandmark } from '@autotoor/tour-common';
import { Controller, Get, Query } from '@nestjs/common';

import { LocalLandmarkSearchCriteriaDto } from './dto/local-landmark-search-criteria.dto';
import { LandmarkService } from './landmark.service';
import {
  internalToLocalLandmark,
  localLandmarkSearchCriteriaToInternal,
} from '../common/converters';

@Controller('/landmark/v1')
export class LandmarkController {
  private readonly landmarkService: LandmarkService;

  constructor(landmarkService: LandmarkService) {
    this.landmarkService = landmarkService;
  }

  @Get('/landmark/local')
  public async getLocalLandmarks(
    @Query() criteria: LocalLandmarkSearchCriteriaDto,
  ): Promise<LocalLandmark[]> {
    return (
      await this.landmarkService.getLocalLandmarks(
        localLandmarkSearchCriteriaToInternal(criteria),
      )
    ).map(internalToLocalLandmark);
  }
}
