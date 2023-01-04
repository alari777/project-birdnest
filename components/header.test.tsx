import { render, screen } from '@testing-library/react';
import Header from './Header';

it('should render header', () => {
  render(<Header />);
  const header = screen.getByText(/PROJECT BIRDNEST: MONITORING SYSTEM/i);
  expect(header).toBeInTheDocument();
  expect(header).toMatchSnapshot();
});
