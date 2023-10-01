import type { PinoLogger } from 'nestjs-pino';
import { instance, mock, reset } from 'ts-mockito';

import { WikipediaLandmarkProviderService } from '../../../src/wikipedia';
import type { WikipediaClientService } from '../../../src/wikipedia/wikipedia-client.service';

describe('WikipediaLandmarkProviderService', () => {
  let service: WikipediaLandmarkProviderService;

  const logger: PinoLogger = mock();

  const wikipediaClientService: WikipediaClientService = mock();

  beforeEach(() => {
    reset(logger);
    reset(wikipediaClientService);
    service = new WikipediaLandmarkProviderService(
      instance(logger),
      instance(wikipediaClientService),
    );
  });

  describe('toImageUrl', () => {
    it('Transforms the image url if there is one', () => {
      const ORIGINAL =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Nevada_City_Firehouse_No._2_on_Broad_Street_in_Nevada_City%2C_California.jpg/150px-Nevada_City_Firehouse_No._2_on_Broad_Street_in_Nevada_City%2C_California.jpg';
      const expected =
        'https://upload.wikimedia.org/wikipedia/commons/c/c4/Nevada_City_Firehouse_No._2_on_Broad_Street_in_Nevada_City%2C_California.jpg';
      expect(service.toImageUrl(ORIGINAL)).toEqual(expected);
    });
  });
});
