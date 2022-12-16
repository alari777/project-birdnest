import { XMLBuilder, XMLParser } from 'fast-xml-parser';

let finalArray = [];

export default async function handler(req, res) {
  const response = await fetch('https://assignments.reaktor.com/birdnest/drones');
  const result = await response.text();

  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: 'atr_',
  };

  const parser = new XMLParser(options);
  const drones = parser.parse(result);

  let violators = [];
  const { drone, atr_snapshotTimestamp } = drones.report.capture; 
  console.log(atr_snapshotTimestamp);

  violators = drone.filter((dron) => {
    const hypot = Math.sqrt(
      Math.pow(250 * 100 * 10 - dron.positionX, 2) +
        Math.pow(250 * 100 * 10 - dron.positionY, 2),
    );
    if (hypot < 100 * 100 * 10) {
      return dron;
    }
  });

  const pilots = await Promise.all(violators.map(async (dron) => {
    const responsePilot = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${dron.serialNumber}`);
    const resultPilot = await responsePilot.json();
    resultPilot.atr_snapshotTimestamp = atr_snapshotTimestamp;
    console.log(resultPilot);
    return resultPilot;
  }));

  // console.log('pilots', pilots);
  console.log('finalArray', finalArray);

  // String(Math.floor(Math.random() * 3000))
  res.status(200).json({ pilots, atr_snapshotTimestamp });
}
