import { Pilots } from "./Pilots.class";
import { mockXmlWithoutViolators } from "./mock.data.pilots";

describe('testing function bootstrap()', () => {
    it("bootstrap working", async () => {
        const instance = new Pilots();
        fetch.resetMocks();
        jest.clearAllMocks();
        fetch.mockResponseOnce(mockXmlWithoutViolators, {
            status: 200,
            headers: {'content-type': 'text/plain'}
        });
        const result = await instance.bootstrap();
        expect(result).toEqual({
            pilots: [],
            atr_snapshotTimestamp: '2022-12-18T19:48:16.956Z'
        });
    });
});
