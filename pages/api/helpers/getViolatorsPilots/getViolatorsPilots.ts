import { DroneType, ViolatorType } from '../../../../types/violators.type';
import { DistanceStatusEnum } from '../../../../enums/violators.enum';
import { Pilots } from '../../classes/Pilots.class';

export async function getViolatorsPilots(
  violators: DroneType[]
): Promise<void> {
  const instance = Pilots.init();
  try {
    await Promise.all(
      violators.map(async (dron) => {
        const responsePilot = await fetch(
          `https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`
        );
        // If `status` is 200 then all things are OK: we have got the pilot.
        // Sometimes we can get error, like 404 (not found) so in that case we just skip this pilot.
        if (responsePilot.status === 200) {
          const resultPilot: ViolatorType = await responsePilot.json();
          // resultPilot.atr_snapshotTimestamp = instance.atrSnapshotTimestamp;
          const newDistance = dron.newDistance;
          let oldDistance = dron.newDistance;
          let previousDistance = '';
          let oldTime = instance.atrSnapshotTimestamp;
          resultPilot.status = '';
          resultPilot.previousDistance = '';

          // Below pixel of code makes next things.
          // If current pilot IS EXIST in store then:
          // 1. Keep its `Previous Distance` to the nest
          // 2. Keep its `Current Distance` to the nest
          // 3. Keep its `snapshotTimestamp`
          // 4. Remove this pilot from store
          if (instance.map.has(resultPilot.pilotId)) {
            oldDistance = Number(
              instance.map.get(resultPilot.pilotId).distance
            );
            previousDistance = String(
              instance.map.get(resultPilot.pilotId).previousDistance
            );
            oldTime = instance.map.get(
              resultPilot.pilotId
            ).atr_snapshotTimestamp;
            instance.map.delete(resultPilot.pilotId);
          }

          // Next thing we need to compare `the new distance` and `the old distance` of the pilot
          // Actually this pilot can be `new` but in that case these values equal `0` and we pass this condition.
          if (newDistance < oldDistance) {
            // Here we have to update distances and status
            resultPilot.previousDistance = String(oldDistance);
            resultPilot.distance = newDistance;
            resultPilot.status = DistanceStatusEnum.UPDATE;

            // It is very important code.
            // Here we need to updating time if this pilot has new closest distance.
            oldTime = instance.atrSnapshotTimestamp;
          } else {
            // We keep the data about the pilot as is
            resultPilot.previousDistance = previousDistance;
            resultPilot.distance = oldDistance;
            resultPilot.status =
              previousDistance === '' ? '' : DistanceStatusEnum.UPDATE;
          }

          // Set final time for each pilot
          resultPilot.atr_snapshotTimestamp = oldTime;
          if (
            resultPilot.atr_snapshotTimestamp !== '' &&
            typeof resultPilot.atr_snapshotTimestamp !== undefined
          ) {
            // Save this object of pilot with all its data in Map() collection (in store)
            instance.map.set(resultPilot.pilotId, resultPilot);
          }
        }
      })
    );
  } catch (err) {
    console.log('Get Violators Pilots', err.message);
    instance.startAppFlag = false;
  }
}
