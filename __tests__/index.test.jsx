import { render, screen } from '@testing-library/react';
import Home from '../pages';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('should render just Home component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  it('render Home', async () => {
    render(<Home />);
    const home = await screen.findByText(/Wait a little bit, please. Data are loading .../i);
    expect(home).toBeInTheDocument();
  });
})

describe('should render component Home with fetched data and additional settings', () => {
  beforeEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();

    const currentTime = String(new Date());
    const mockViolators = {
      pilots: [{
        pilotId: 'A-773355',
        firstName: 'Test Name',
        phoneNumber: '+358 45 777 77 77',
        email: 'test@mail.fi',
        atr_snapshotTimestamp: currentTime,
        distance: 50,
        status: 'updated',
        previousDistance: '10'
      }],
      atr_snapshotTimestamp: currentTime
    }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockViolators),
      status: 200
    });

  });

  it('extended view', async () => {
    render(<Home />);
    const extendedView = await screen.findByTestId('test-extendedView');
    expect(screen.queryByTestId('test-th1')).toBeNull();
    await userEvent.click(extendedView);
    expect(screen.queryByTestId('test-th1')).toBeInTheDocument();
    await userEvent.click(extendedView);
    expect(screen.queryByTestId('test-th1')).toBeNull();
  });

  it('render home with data', async () => {
    render(<Home />);
    const home = await screen.findByTestId('snapshot-time');
    expect(home).toBeInTheDocument();
  });
});
