import { DronesType, DroneType } from "../../../../types/violators.type";
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: 'atr_',
});

type GetDronesType = {
    violators: DroneType[];
    atrSnapshotTimestamp: string;
}

/*
This function makes next ones:
1. GET() request to third party API in order to fetch data in XML response
2. Parse this response
3. Use Pythagoras theorem in order to find violators drones
*/
export async function getDrones(): Promise<GetDronesType> {
    try {
        const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
        if (response.status === 200) {
            const result = await response.text();
            const drones: DronesType = parser.parse(result);

            const { drone, atr_snapshotTimestamp } = drones.report.capture;

            // The filtering an object which was created via parsing XML response
            const violators = drone.filter((dron: DroneType) => {
                // Use Pythagoras theorem in order to find a hypotenuse
                const hypot = Math.sqrt(
                    Math.pow(250 * 100 * 10 - dron.positionX, 2) +
                    Math.pow(250 * 100 * 10 - dron.positionY, 2),
                );
                // If hypotenuse is less than 100 metres (100 * 100 * 10) then this pilot is added it response
                if (hypot < 100 * 100 * 10) { // <- 100m * 100cm * 10mm -- that is radius of `no drone zone`
                    dron.newDistance = Math.ceil((hypot / 10 / 100) * 100) / 100;
                    return dron;
                }
            });

            return { violators, atrSnapshotTimestamp: atr_snapshotTimestamp };
        } else {
            return {
                violators: [],
                atrSnapshotTimestamp: ''
            };
        }
    } catch (err) {
        console.log(err.message);
        return {
            violators: [],
            atrSnapshotTimestamp: ''
        };
    }
}
