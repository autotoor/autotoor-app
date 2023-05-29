/* eslint-disable jest/expect-expect */
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';
import { WikipediaClientService } from '../../src/wikipedia/wikipedia-client.service';
import { COORDS_1, COORDS_2 } from '../mock/coordinates';
import {
  WIKIPEDIA_PAGE_DETAILS_RESPONSE_1,
  WIKIPEDIA_PAGE_SUMMARY_RESPONSE_1,
} from '../mock/wikipedia';

/**
 * Integration tests for the LandmarkController.
 * Just covers basic happy path scenarios. More detailed scenarios are covered in the unit tests.
 */
describe('Landmark Routes Test', () => {
  let app: INestApplication;

  let wikipediaClient: WikipediaClientService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    wikipediaClient = app.get<WikipediaClientService>(WikipediaClientService);
  });

  describe('GET /landmark/v1/landmark/local', () => {
    it('should return an empty array', async () => {
      const expected = [
        {
          distance: 3218.817417414344,
          landmark: {
            id: '107801',
            title: 'Nevada City, California',
            readableSummary:
              "Nevada City (originally, Ustumah, a Nisenan village; later, Nevada, Deer Creek Dry Diggins, and Caldwell's Upper Store) is the county seat of Nevada County, California, United States, 60 miles (97 km) northeast of Sacramento, 84 miles (135 km) southwest of Reno and 147 miles (237 km) northeast of San Francisco.",
            coordinates: COORDS_2,
            imageUrl:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg/150px-Broad_Street_Downtown_Area_in_Nevada_City%2C_California.jpg',
          },
        },
      ];
      jest
        .spyOn(wikipediaClient, 'getLocalPageSummaries')
        .mockResolvedValue(WIKIPEDIA_PAGE_SUMMARY_RESPONSE_1);
      jest
        .spyOn(wikipediaClient, 'getPageDetails')
        .mockResolvedValue(WIKIPEDIA_PAGE_DETAILS_RESPONSE_1);
      return request(app.getHttpServer())
        .get(
          `/landmark/v1/landmark/local?latitude=${COORDS_1.latitude}&longitude=${COORDS_1.longitude}`,
        )
        .expect(200)
        .expect(expected);
    });
  });
});
