import { getDrones, getViolatorsPilots, Pilots } from "./Pilots.class";
import {
    mockXmlWithoutViolators,
    mockXmlWithViolators,
    mockJsonViolators,
    mockPilot
} from "./mock.data.pilots";
import * as moduleApi from './Pilots.class';

describe('testing function getDrones()', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it("should return empty array, status code is 200, there are no any violators", async () => {
        fetch.mockResponseOnce(mockXmlWithoutViolators, {
            status: 200,
            headers: {'content-type': 'text/plain'}
        });
        const result = await getDrones();
        expect(result).toHaveLength(0);
    });

    it("should return empty array, status code is NOT 200, there are no any violators", async () => {
        fetch.mockResponseOnce(mockXmlWithoutViolators, {
            status: 404,
            headers: {'content-type': 'text/plain'}
        });
        const result = await getDrones();
        expect(result).toBeUndefined();
    });

    it("should return array with length equals 3, status code is 200, there are no any violators", async () => {
        fetch.mockResponseOnce(mockXmlWithViolators, {
            status: 200,
            headers: {'content-type': 'text/plain'}
        });
        const result = await getDrones();
        expect(result).toHaveLength(3);
    });

    it("should return array with length equals 3, status code is NOT 200, there are no any violators", async () => {
        fetch.mockResponseOnce(mockXmlWithViolators, {
            status: 404,
            headers: {'content-type': 'text/plain'}
        });
        const result = await getDrones();
        expect(result).toBeUndefined();
    });
});
describe('testing function getViolatorsPilots()', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it("should return void, status code is 200, map.has, map.get, map.delete", async () => {
        fetch.mockResponse(JSON.stringify(mockJsonViolators), {
            status: 200,
            headers: {'content-type': 'application/json'}
        });

        Map.prototype.has = jest.fn().mockReturnValue(true);
        Map.prototype.get = jest.fn().mockReturnValue({ distance: 1});
        Map.prototype.delete = jest.fn();

        const result = await getViolatorsPilots([mockPilot]);

        expect(result).toBeUndefined();
        expect(Map.prototype.has).toHaveBeenCalled();
        expect(Map.prototype.get).toHaveBeenCalledTimes(2);
        expect(Map.prototype.delete).toHaveBeenCalled();
    });

});
