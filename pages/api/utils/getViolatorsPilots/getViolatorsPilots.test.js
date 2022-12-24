import { mockJsonViolators, mockPilot } from "../../classes/mock.data.pilots";
import { getViolatorsPilots } from "./getViolatorsPilots";

describe('testing function getViolatorsPilots()', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();

        Map.prototype.has = jest.fn().mockReturnValue(true);
        Map.prototype.delete = jest.fn();
    });

    it("return VOID, status code of pilot is 200, map.has, map.get, map.delete are called, distance is 100", async () => {
        fetch.mockResponse(JSON.stringify(mockJsonViolators), {
            status: 200,
            headers: {'content-type': 'application/json'}
        });

        Map.prototype.get = jest.fn().mockReturnValue({ distance: 100, previousDistance: 40 } );

        const result = await getViolatorsPilots([mockPilot]);

        expect(result).toBeUndefined();
        expect(Map.prototype.has).toHaveBeenCalled();
        expect(Map.prototype.get).toHaveBeenCalledTimes(2);
        expect(Map.prototype.delete).toHaveBeenCalled();
    });
    it("return VOID, status code of pilot is 200, map.has, map.get, map.delete are called, distance is 1", async () => {
        fetch.mockResponse(JSON.stringify(mockJsonViolators), {
            status: 200,
            headers: {'content-type': 'application/json'}
        });

        Map.prototype.get = jest.fn().mockReturnValue({ distance: 1, previousDistance: 40 } );

        const result = await getViolatorsPilots([mockPilot]);

        expect(result).toBeUndefined();
        expect(Map.prototype.has).toHaveBeenCalled();
        expect(Map.prototype.get).toHaveBeenCalledTimes(2);
        expect(Map.prototype.delete).toHaveBeenCalled();
    });

    it("return VOID, status code of pilot is 404, map.has, map.get, map.delete are not called", async () => {
        fetch.mockResponse(JSON.stringify(mockJsonViolators), {
            status: 404,
            headers: {'content-type': 'application/json'}
        });

        Map.prototype.get = jest.fn().mockReturnValue({ distance: 77, previousDistance: 40 } );

        const result = await getViolatorsPilots([mockPilot]);

        expect(result).toBeUndefined();
        expect(Map.prototype.has).not.toHaveBeenCalled();
        expect(Map.prototype.get).not.toHaveBeenCalled();
        expect(Map.prototype.delete).not.toHaveBeenCalled();
    });

});
