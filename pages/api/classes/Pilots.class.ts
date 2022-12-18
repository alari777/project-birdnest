import { XMLParser } from 'fast-xml-parser';
import { BootstrapType, DronesType, DroneType, ViolotarType } from '../../../types/violators.type';
import { DistanceStatusEnum } from '../../../enums/violators.enum';

export class Pilots {
  private static instance: Pilots;
  
  private map: Map<string, ViolotarType>;
  private parser: XMLParser;
  private atr_snapshotTimestamp: string;

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
      const drones = await this.getDrones();
      await this.getViolatorsPilotes(drones);
      const pilots = this.formViolatorsPilotes();
      return { 
        pilots,
        atr_snapshotTimestamp: this.atr_snapshotTimestamp 
      };  
    } catch(err) {
        console.log('bootstrap:', err.message);
    }
  }
  
  private getDrones = async(): Promise<DroneType[]> => {
    const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
    const result = await response.text();
    const drones: DronesType = this.parser.parse(result);

    const { drone, atr_snapshotTimestamp } = drones.report.capture; 

    this.atr_snapshotTimestamp = atr_snapshotTimestamp;

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

  private getViolatorsPilotes = async(violators: DroneType[]): Promise<void> => {
    await Promise.all(violators.map(async (dron) => {
      const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
      // if (responsePilot.status === 200) {
        const resultPilot: ViolotarType = await responsePilot.json();
        resultPilot.atr_snapshotTimestamp = this.atr_snapshotTimestamp;
        // resultPilot.distance = dron.distance;
        const newDistance = dron.newDistance;
        let oldDistance = dron.newDistance;
        let previusDistance = '';
        resultPilot.status = '';
        resultPilot.previusDistance = '';
        if (this.map.has(resultPilot.pilotId)) {
            oldDistance = Number(this.map.get(resultPilot.pilotId).distance);
            previusDistance = String(this.map.get(resultPilot.pilotId).previusDistance);
            this.map.delete(resultPilot.pilotId);
        }
        if (newDistance < oldDistance) {
          resultPilot.previusDistance = String(oldDistance);  
          resultPilot.distance = newDistance;
          resultPilot.status = DistanceStatusEnum.UPDATE;
        } else {
          resultPilot.previusDistance = previusDistance;  
          resultPilot.distance = oldDistance;
          resultPilot.status = previusDistance === '' ? '' : DistanceStatusEnum.UPDATE;
        }

        this.map.set(resultPilot.pilotId, resultPilot);
      // }
      return resultPilot;
    }));
  }

  private formViolatorsPilotes = (): ViolotarType[] => {
    const pilots: ViolotarType[] = [];
    for (let pilot of this.map.values()) {
      const subtractDatetime: number = Number(new Date()) - Number(new Date(pilot.atr_snapshotTimestamp));
      const subtractDatetimeInMins = Number(subtractDatetime / 1000 / 60);
      if (subtractDatetimeInMins > 10) {
        this.map.delete(pilot.pilotId);
      } else {
          pilots.push(pilot);        
      }
    }

    return pilots;
  }
}
