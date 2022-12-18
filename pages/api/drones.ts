import { NextApiRequest, NextApiResponse } from 'next';
import { XMLParser } from 'fast-xml-parser';
import { DronesType, DroneType, ViolotarType } from '../../types/violators.type';

class Pilots {
  private static instance: Pilots;
  
  public map: Map<string, ViolotarType>;
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

  public bootstrap = async() => {
    try {
      const drones = await this.getDrones();
      await this.getViolatorsPilotes(drones);
      const pilots = this.formViolatorsPilotes();
      return { 
        pilots,
        atr_snapshotTimestamp: this.atr_snapshotTimestamp 
      };  
    } catch(err) {

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
      const resultPilot: ViolotarType = await responsePilot.json();
      resultPilot.atr_snapshotTimestamp = this.atr_snapshotTimestamp;
      // resultPilot.distance = dron.distance;
      const newDistance = dron.newDistance;
      let oldDistance = dron.newDistance;
      resultPilot.status = '';
      resultPilot.previusDistance = '';
      if (this.map.has(resultPilot.pilotId)) {
          oldDistance = Number(this.map.get(resultPilot.pilotId).distance);
          this.map.delete(resultPilot.pilotId);
      }
      if (newDistance < oldDistance) {
        resultPilot.previusDistance = String(oldDistance);  
        resultPilot.distance = newDistance;
        resultPilot.status = 'updated';
      } else {
        resultPilot.previusDistance = '';  
        resultPilot.distance = oldDistance;
        resultPilot.status = '';
      }

      this.map.set(resultPilot.pilotId, resultPilot);
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

export default async function violatorsPilotes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const violatorsPilotes = Pilots.init();
    const { pilots, atr_snapshotTimestamp } = await violatorsPilotes.bootstrap();
    for (let pilot of violatorsPilotes.map.values()) {
      if (pilot.pilotId === 'P-7l4YFV5XnO') console.log(pilot);
    }
    res.status(200).json({ pilots, atr_snapshotTimestamp });
  }
}




/*
const map = new Map();

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: 'atr_',
};

const parser = new XMLParser(options);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
    const result = await response.text();
    const drones = parser.parse(result);

    const { drone, atr_snapshotTimestamp } = drones.report.capture; 

    const violators = drone.filter((dron) => {
      const hypot = Math.sqrt(
        Math.pow(250 * 100 * 10 - dron.positionX, 2) +
          Math.pow(250 * 100 * 10 - dron.positionY, 2),
      );
      if (hypot < 100 * 100 * 10) { // <- 100m * 100cm * 10mm -- that is radius of `no drone zone`
        dron.newDistance = (hypot / 10 / 100).toFixed(2);
        return dron;
      }
    });

    await Promise.all(violators.map(async (dron) => {
      const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
      const resultPilot = await responsePilot.json();
      resultPilot.atr_snapshotTimestamp = atr_snapshotTimestamp;
      // resultPilot.distance = dron.distance;
      const newDistance = dron.newDistance;
      let oldDistance = dron.newDistance;
      resultPilot.status = '';
      resultPilot.previusDistance = '';
      if (map.has(resultPilot.pilotId)) {
          oldDistance = map.get(resultPilot.pilotId).distance;
          map.delete(resultPilot.pilotId);
      }
      if (newDistance < oldDistance) {
        resultPilot.previusDistance = String(oldDistance);  
        resultPilot.distance = newDistance;
        resultPilot.status = 'updated';
      } else {
        resultPilot.previusDistance = '';  
        resultPilot.distance = oldDistance;
        resultPilot.status = '';
      }

      map.set(resultPilot.pilotId, resultPilot);
      return resultPilot;
    }));

    const pilots = [];
    for (let pilot of map.values()) {
      const subtractDatetime = (new Date() - new Date(pilot.atr_snapshotTimestamp)) / 1000 / 60;
      if (subtractDatetime > 10) {
          map.delete(pilot.pilotId);
      } else {
          pilots.push(pilot);        
      }
    }
    res.status(200).json({ pilots, atr_snapshotTimestamp });
  }
}
*/