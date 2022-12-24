import { BootstrapType, ViolatorType } from '../../../types/violators.type';
import { getDrones } from '../utils/getdrones/getDrones';
import { getViolatorsPilots } from '../utils/getViolatorsPilots/getViolatorsPilots';

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

