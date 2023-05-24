import { LocalLandmark } from '@autotoor/tour-common';
import { Controller, Get, Query } from '@nestjs/common';

import { LocalLandmarkSearchCriteriaDto } from './dto/local-landmark-search-criteria.dto';

@Controller('/landmark')
export class LandmarkController {
  @Get('/local')
  public async getLocalLandmarks(
    @Query() _criteria: LocalLandmarkSearchCriteriaDto,
  ): Promise<LocalLandmark[]> {
    return [];
  }
}