import { cleanup, render, screen } from '@testing-library/react-native';

import { LandmarkDisplayScreen } from '../feature/app/LandmarkDisplayScreen';

describe('LandmarkDisplayScreen', () => {
  afterEach(cleanup);

  it('renders the landmark title', () => {
    render(
      <LandmarkDisplayScreen
        landmarkText="A short landmark description."
        imageUrl=""
        title="Expo monorepo"
        isPaused={false}
        isError={false}
        isLoading={false}
        errorMessage={null}
        onPause={jest.fn()}
        onNext={jest.fn()}
      />
    );

    expect(screen.getByText('Expo monorepo')).toBeDefined();
  });
});
