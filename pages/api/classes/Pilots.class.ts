import { ViolatorType } from '../../../types/violators.type';
import { formViolatorsPilots } from '../helpers/formViolatorsPilots/formViolatorsPilots';
import { startApplicationService } from '../services/startApplicationService/startApplicationService'

export class Pilots {
  private static instance: Pilots;

  public atrSnapshotTimestamp: string = '';
  public map: Map<string, ViolatorType>;
  public startAppFlag: boolean = false;

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
    if (!this.startAppFlag) {
      await startApplicationService();
      this.startAppFlag = true;
    }

    const pilots = formViolatorsPilots();

    return {
      pilots,
      atr_snapshotTimestamp: this.atrSnapshotTimestamp
    };
  }
}

