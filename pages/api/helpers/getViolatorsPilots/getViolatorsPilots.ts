import { DroneType, ViolatorType } from '../../../../types/violators.type';
import { DistanceStatusEnum } from '../../../../enums/violators.enum';
import { Pilots } from '../../classes/Pilots.class';

export async function getViolatorsPilots(violators: DroneType[]): Promise<void> {
    const instance = Pilots.init();
    try {
        await Promise.all(violators.map(async (dron) => {
            const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
            if (responsePilot.status === 200) {
                const resultPilot: ViolatorType = await responsePilot.json();
                resultPilot.atr_snapshotTimestamp = instance.atrSnapshotTimestamp;
                const newDistance = dron.newDistance;
                let oldDistance = dron.newDistance;
                let previousDistance = '';
                resultPilot.status = '';
                resultPilot.previousDistance = '';
                if (instance.map.has(resultPilot.pilotId)) {
                    oldDistance = Number(instance.map.get(resultPilot.pilotId).distance);
                    previousDistance = String(instance.map.get(resultPilot.pilotId).previousDistance);
                    instance.map.delete(resultPilot.pilotId);
                }
                if (newDistance < oldDistance) {
                    resultPilot.previousDistance = String(oldDistance);
                    resultPilot.distance = newDistance;
                    resultPilot.status = DistanceStatusEnum.UPDATE;
                } else {
                    resultPilot.previousDistance = previousDistance;
                    resultPilot.distance = oldDistance;
                    resultPilot.status = previousDistance === '' ? '' : DistanceStatusEnum.UPDATE;
                }

                if (resultPilot.atr_snapshotTimestamp !== ''
                    && typeof resultPilot.atr_snapshotTimestamp !== undefined
                ) {
                    instance.map.set(resultPilot.pilotId, resultPilot);
                }
            }
        }));
    } catch (err) {
        console.log('Get Violators Pilots', err.message);
        instance.startAppFlag = false;
    }
}
