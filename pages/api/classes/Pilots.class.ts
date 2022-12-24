import { ViolatorType } from '../../../types/violators.type';
import { getDrones } from '../utils/getdrones/getDrones';
import { getViolatorsPilots } from '../utils/getViolatorsPilots/getViolatorsPilots';
import { formViolatorsPilots } from '../utils/formViolatorsPilots/formViolatorsPilots';

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

  public bootstrap = async(): Promise<{ pilots: ViolatorType[]; atr_snapshotTimestamp: string }> => {
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

