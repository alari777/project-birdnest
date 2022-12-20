import { Pilots } from "./Pilots.class";
import {ViolotarType} from "../../../types/violators.type";
//jest.mock('./Pilots.class');
// jest.mock('fetch');

describe('some tests', () => {
    it("should return hello for the first call", async () => {
        // jest.mock('fetch');
        const result = new Pilots();
        result.bootstrap = jest.fn().mockReturnValue({
            pilots: {
                pilotId: '',
                firstName: '',
                phoneNumber: '',
                email: '',
            },
            atr_snapshotTimestamp: ''
        })
        /*
        result.getDrones = jest.fn().mockReturnValue({
            positionX: 0,
            positionY: 0,
            newDistance: 0
        });
        const f = await result.getDrones();
        expect(f).toEqual({
            positionX: 0,
            positionY: 0,
            newDistance: 10
        });
        */

        // const getDronesMock = jest.
        // await result.bootstrap();
    });
});
