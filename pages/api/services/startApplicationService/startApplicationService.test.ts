jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

import { mockXmlWithoutViolators } from '../../classes/mock.data.pilots';
import { startApplicationService } from './startApplicationService';

describe('testing function startApplicationService()', () => {
  it('startApplicationService working', async () => {
    fetch.resetMocks();
    jest.clearAllMocks();
    fetch.mockResponse(mockXmlWithoutViolators, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });

    await startApplicationService();
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});
