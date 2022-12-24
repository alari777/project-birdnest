import { getViolatorsPilots } from "./Pilots.class";
import {
    mockJsonViolators,
    mockPilot
} from "./mock.data.pilots";

// jest.mock("./Pilots.class", () => ({
//     getDrones: jest.fn()
// }));

describe('testing function getViolatorsPilots()', () => {
    beforeEach(() => {
        fetch.resetMocks();
        jest.clearAllMocks();
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

/*describe('testing function bootstrap()', () => {
    let instance;
    let spyBootstrap;
    let spyGetDrones;

    beforeAll(() => {
        instance = new Pilots();
    });

    beforeEach(() => {
        spyBootstrap = jest.spyOn(instance, 'bootstrap');
        // spyGetDrones = jest.spyOn(spyBootstrap, 'getDrones');
    });

    it("bootstrap working, catch()", async () => {
        // expect(await instance.bootstrap()).toEqual({
        //     pilots: mockJsonViolators,
        //     atr_snapshotTimestamp: '',
        // });
        // expect(await instance.bootstrap()).toEqual({}) // deterministic
        expect(await instance.bootstrap()).toBeUndefined();
        expect(instance.bootstrap).toHaveBeenCalledTimes(1);
        spyBootstrap.mockRestore();

        // instance.bootstrap = jest.fn().mockReturnValue({
        //     pilots: mockJsonViolators,
        //     atr_snapshotTimestamp: '',
        // });
        // const result = await instance.bootstrap();
        // expect(result).toBeCalledTimes(2);
    });

    it("bootstrap working, try", async () => {
        // fetch.resetMocks();
        // fetch.mockResponseOnce(mockXmlWithoutViolators, {
        //     status: 404,
        //     headers: {'content-type': 'text/plain'}
        // });
        // jest.mock('./Pilots.class', () => {
        //     const originalModule = jest.requireActual('./Pilots.class');
        //     return {
        //         __esModule: true,
        //         ...originalModule,
        //         getDrones: jest.fn().mockReturnValue(12),
        //     }
        // })
        // jest.spyOn(instance, 'getDrones');
        expect(await instance.bootstrap()).toBeUndefined();
        expect(instance.bootstrap).toHaveBeenCalledTimes(1);
        // spyGetDrones.mockRestore();
    });

    afterEach(() => {
        spyBootstrap.mockRestore();
        // spyGetDrones.mockRestore();
    });
});*/
