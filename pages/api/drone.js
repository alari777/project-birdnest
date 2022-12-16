import { XMLParser } from 'fast-xml-parser';

class Pilots {
  
}

const map = new Map();

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: 'atr_',
};

const parser = new XMLParser(options);

export default async function handler(req, res) {
  const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
  const result = await response.text();
  const drones = parser.parse(result);

  const { drone, atr_snapshotTimestamp } = drones.report.capture; 

  const violators = drone.filter((dron) => {
    const hypot = Math.sqrt(
      Math.pow(250 * 100 * 10 - dron.positionX, 2) +
        Math.pow(250 * 100 * 10 - dron.positionY, 2),
    );
    if (hypot < 100 * 100 * 10) {
      return dron;
    }
  });

  await Promise.all(violators.map(async (dron) => {
    const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
    const resultPilot = await responsePilot.json();
    resultPilot.atr_snapshotTimestamp = atr_snapshotTimestamp;
    if (map.has(resultPilot.pilotId)) {
        map.delete(resultPilot.pilotId);
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
