import { getDrones } from './getDrones';
import {
  mockXmlWithoutViolators,
  mockXmlWithViolators,
  mockResponseJsonGetDrones,
} from '../../classes/mock.data.pilots';
import { FetchMock } from 'jest-fetch-mock';
const fetchMock = fetch as FetchMock;

describe('testing function getDrones()', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should return empty array, status code is 200, no violators', async () => {
    fetchMock.mockResponseOnce(mockXmlWithoutViolators, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });
    const result = await getDrones();
    expect(result).toEqual({
      violators: [],
      atrSnapshotTimestamp: '2022-12-18T19:48:16.956Z',
    });
  });

  it('should return empty array, status code is 404, no violators', async () => {
    fetchMock.mockResponseOnce(mockXmlWithoutViolators, {
      status: 404,
      headers: { 'content-type': 'text/plain' },
    });
    const result = await getDrones();
    expect(result).toEqual({
      violators: [],
      atrSnapshotTimestamp: '',
    });
  });

  it('should return array with length equals 3, status code is 200, there are violators', async () => {
    fetchMock.mockResponseOnce(mockXmlWithViolators, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });
    const result = await getDrones();
    expect(result).toEqual({
      violators: mockResponseJsonGetDrones,
      atrSnapshotTimestamp: '2022-12-18T19:48:16.956Z',
    });
  });

  it('should return empty array, status code is 404, there are violators', async () => {
    fetchMock.mockResponseOnce(mockXmlWithViolators, {
      status: 404,
      headers: { 'content-type': 'text/plain' },
    });
    const result = await getDrones();
    expect(result).toEqual({
      violators: [],
      atrSnapshotTimestamp: '',
    });
  });

  it('the fetch fails with an error', async () => {
    fetchMock.mockRejectOnce(new Error('test: the fetch fails with an error'));
    const result = await getDrones();
    expect(result).toEqual({
      violators: [],
      atrSnapshotTimestamp: '',
    });
  });
});
