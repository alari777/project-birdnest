import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

jest.mock('fetch');

describe('Home', () => {
  it('renders input checkbox', () => {
    render(<Home />)

    const inputCheckbox = screen.getByText(/Extended View/i);
    expect(inputCheckbox).toBeInTheDocument();
  });

  // it('test fetch function', () => {
  //   fetch.ge
  // })
})
