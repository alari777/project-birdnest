import { XMLParser } from 'fast-xml-parser';
import { BootstrapType, DronesType, DroneType, ViolotarType } from '../../../types/violators.type';
import { DistanceStatusEnum } from '../../../enums/violators.enum';

export const getDrones = async(): Promise<DroneType[] | undefined> => {
  const instance = Pilots.init();
  const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
  if (response.status === 200) {
    const result = await response.text();
    const drones: DronesType = instance.parser.parse(result);

    const {drone, atr_snapshotTimestamp} = drones.report.capture;

    instance.atrSnapshotTimestamp = atr_snapshotTimestamp;

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

    return violators;
  }
  return undefined;
}
export const getViolatorsPilots = async(violators: DroneType[]): Promise<void> => {
  const instance = Pilots.init();
  await Promise.all(violators.map(async (dron) => {
    const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
    if (responsePilot.status === 200) {
      const resultPilot: ViolotarType = await responsePilot.json();
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

export class Pilots {
  private static instance: Pilots;

  public atrSnapshotTimestamp: string;
  public parser: XMLParser;
  public map: Map<string, ViolotarType>;

  private constructor() {
    this.map = new Map();
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: 'atr_',
    });
  }

  public static init(): Pilots {
    if (!Pilots.instance) {
      Pilots.instance = new Pilots();
    }
    return Pilots.instance;
  }

  public bootstrap = async(): Promise<BootstrapType> => {
    try {
      // const drones = await this.getDrones();
      const drones = await getDrones();
      // if (drones) await this.getViolatorsPilots(drones);
      if (drones) await getViolatorsPilots(drones);

      const pilots = this.formViolatorsPilots();
      return {
        pilots,
        atr_snapshotTimestamp: this.atrSnapshotTimestamp
      };
    } catch(err) {
        console.log('bootstrap:', err.message);
    }
  }

/*  private getDrones = async(): Promise<DroneType[]> => {
    const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
    const result = await response.text();
    const drones: DronesType = this.parser.parse(result);

    const { drone, atr_snapshotTimestamp } = drones.report.capture;

    this.atrSnapshotTimestamp = atr_snapshotTimestamp;

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

    return violators;
  }
  private getViolatorsPilots = async(violators: DroneType[]): Promise<void> => {
    await Promise.all(violators.map(async (dron) => {
      const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
      if (responsePilot.status === 200) {
        const resultPilot: ViolotarType = await responsePilot.json();
        resultPilot.atr_snapshotTimestamp = this.atrSnapshotTimestamp;
        const newDistance = dron.newDistance;
        let oldDistance = dron.newDistance;
        let previousDistance = '';
        resultPilot.status = '';
        resultPilot.previousDistance = '';
        if (this.map.has(resultPilot.pilotId)) {
            oldDistance = Number(this.map.get(resultPilot.pilotId).distance);
            previousDistance = String(this.map.get(resultPilot.pilotId).previousDistance);
            this.map.delete(resultPilot.pilotId);
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

        this.map.set(resultPilot.pilotId, resultPilot);
      }
    }));
  }*/


  private formViolatorsPilots = (): ViolotarType[] => {
    const pilots: ViolotarType[] = [];
    for (let pilot of this.map.values()) {
      const subtractDatetime: number = Number(new Date()) - Number(new Date(pilot.atr_snapshotTimestamp));
      const subtractTimeInMinutes = Number(subtractDatetime / 1000 / 60);
      if (subtractTimeInMinutes > 10) {
        this.map.delete(pilot.pilotId);
      } else {
          pilots.push(pilot);
      }
    }

    return pilots;
  }
}
