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
export async function getDrones(): Promise<GetDronesType> {
    try {
        const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
        if (response.status === 200) {
            const result = await response.text();
            const drones: DronesType = parser.parse(result);

            const {drone, atr_snapshotTimestamp} = drones.report.capture;

            const violators = drone.filter((dron: DroneType) => {
                const hypot = Math.sqrt(
                    Math.pow(250 * 100 * 10 - dron.positionX, 2) +
                    Math.pow(250 * 100 * 10 - dron.positionY, 2),
                );
                if (hypot < 100 * 100 * 10) { // <- 100m * 100cm * 10mm -- that is radius of `no drone zone`
                    dron.newDistance = Math.ceil((hypot / 10 / 100) * 100) / 100;
                    return dron;
                }
            });

            return { violators, atrSnapshotTimestamp: atr_snapshotTimestamp };
        }
    } catch (err) {
        console.error(err.message);
        return {
            violators: [],
            atrSnapshotTimestamp: ''
        };
    }
}
