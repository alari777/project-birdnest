import { render, screen } from '@testing-library/react';
import Footer from './Footer';

it('should render footer', () => {
  render(<Footer />);
  const footer = screen.getByText(/Project Birdnest. Created at Nestjs. 2022/i);
  expect(footer).toBeInTheDocument();
  expect(footer).toMatchSnapshot();
});
