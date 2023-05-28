import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../../src/app.module';

/**
 * Integration tests for the LandmarkController.
 * Just covers basic happy path scenarios. More detailed scenarios are covered in the unit tests.
 */
describe('Landmark Routes Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /landmark/v1/landmark/local', () => {
    it('should return an empty array', async () => {
      return request(app.getHttpServer())
        .get('/landmark/v1/landmark/local?latitude=123.45&longitude=987.53')
        .expect(200)
        .expect([]);
    });
  });
});
