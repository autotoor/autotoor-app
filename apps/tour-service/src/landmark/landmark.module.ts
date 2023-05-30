import { Module } from '@nestjs/common';

import { LandmarkController } from './landmark.controller';
import { LandmarkService } from './landmark.service';
import { GeoModule } from '../geo';
import { WikipediaModule } from '../wikipedia';

@Module({
  controllers: [LandmarkController],
  imports: [GeoModule, WikipediaModule],
  providers: [LandmarkService],
})
export class LandmarkModule {}
