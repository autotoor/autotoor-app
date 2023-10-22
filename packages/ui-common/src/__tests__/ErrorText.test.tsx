import { cleanup, render, screen } from '@testing-library/react-native';

import { ErrorText } from '../ErrorText';

afterEach(cleanup);

it('renders textual children', () => {
  render(<ErrorText>Textual content</ErrorText>);
  expect(screen.getByText('Textual content')).toBeDefined();
});
