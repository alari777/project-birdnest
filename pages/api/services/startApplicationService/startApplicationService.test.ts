jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

import { mockXmlWithoutViolators } from '../../classes/mock.data.pilots';
import { startApplicationService } from './startApplicationService';
import { FetchMock } from 'jest-fetch-mock';
const fetchMock = fetch as FetchMock;

describe('testing function startApplicationService()', () => {
  it('startApplicationService working', async () => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    fetchMock.mockResponse(mockXmlWithoutViolators, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });

    await startApplicationService();
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});
