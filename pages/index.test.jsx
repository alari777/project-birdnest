require('jest-fetch-mock').disableMocks();
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './index';
import '@testing-library/jest-dom';

describe('Home', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('renders input checkbox', () => {
    // act(() => {
    //   ReactDOM.createRoot(container).render(<Home />);
    // });
    // // render(<Home />)
    //
    // const inputCheckbox = screen.getByText(/Extended View/i);
    // expect(inputCheckbox).toBeInTheDocument();
  });

  // it('test fetch function', () => {
  //   fetch.ge
  // })
})
