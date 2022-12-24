import { BootstrapType, DroneType, ViolatorType } from '../../../types/violators.type';
import { DistanceStatusEnum } from '../../../enums/violators.enum';
import { getDrones } from '../utils/getdrones/getDrones';


export const getViolatorsPilots = async(violators: DroneType[]): Promise<void> => {
  const instance = Pilots.init();
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

      instance.map.set(resultPilot.pilotId, resultPilot);
    }
  }));
}
export const formViolatorsPilots = (): ViolatorType[] => {
  const instance = Pilots.init();
  const pilots: ViolatorType[] = [];
  for (let pilot of instance.map.values()) {
    const subtractDatetime: number = Number(new Date()) - Number(new Date(pilot.atr_snapshotTimestamp));
    const subtractTimeInMinutes = Number(subtractDatetime / 1000 / 60);
    if (subtractTimeInMinutes > 10) {
      instance.map.delete(pilot.pilotId);
    } else {
      pilots.push(pilot);
    }
  }

  return pilots;
}

export class Pilots {
  private static instance: Pilots;

  public atrSnapshotTimestamp: string;
  public map: Map<string, ViolatorType>;

  private constructor() {
    this.map = new Map();
  }

  public static init(): Pilots {
    if (!Pilots.instance) {
      Pilots.instance = new Pilots();
    }
    return Pilots.instance;
  }

  public bootstrap = async(): Promise<BootstrapType> => {
    const { violators, atrSnapshotTimestamp } = await getDrones();

    if (violators.length !== 0) {
      await getViolatorsPilots(violators);
    }
    this.atrSnapshotTimestamp = atrSnapshotTimestamp;
    const pilots = formViolatorsPilots();

    return {
      pilots,
      atr_snapshotTimestamp: atrSnapshotTimestamp
    };
  }
}

