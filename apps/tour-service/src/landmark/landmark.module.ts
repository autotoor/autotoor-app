import { Module } from '@nestjs/common';

import { LandmarkController } from './landmark.controller';

@Module({
  controllers: [LandmarkController],
  providers: [],
})
export class LandmarkModule {}
