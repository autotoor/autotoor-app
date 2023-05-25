import { Module } from '@nestjs/common';

import { GeoService } from './geo.service';

@Module({
  exports: [GeoService],
  providers: [GeoService],
})
export class GeoModule {}
