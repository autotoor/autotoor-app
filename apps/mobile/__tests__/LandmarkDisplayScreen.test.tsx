import { cleanup, render, screen } from '@testing-library/react-native';
import { instance, mock, reset } from 'ts-mockito';

import { LandmarkDisplayScreen } from '../feature/app/LandmarkDisplayScreen';
import { SpeechService } from '../service';

describe('LandmarkDisplayScreen', () => {
  const speechService: SpeechService = mock();

  beforeEach(() => {
    reset(speechService);
  });

  afterEach(cleanup);

  it('says Expo monorepo', () => {
    render(<LandmarkDisplayScreen speechService={instance(speechService)} />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });
});
