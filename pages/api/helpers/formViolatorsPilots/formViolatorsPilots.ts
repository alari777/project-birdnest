import { ViolatorType } from '../../../../types/violators.type';
import { Pilots } from '../../classes/Pilots.class';

// This function works with Map() collection - it is store where are located all violators pilots.
export function formViolatorsPilots(): ViolatorType[] {
  const instance = Pilots.init();
  // Init array for return
  const pilots: ViolatorType[] = [];
  // This loop makes two things:
  // 1. If time of pilot is `expired` - data about current pilot are keeping more than 10 minutes -
  // then we need to remove this pilot from our store
  // 2. If no, so we need to push this pilot in array
  for (let pilot of instance.map.values()) {
    const { atr_snapshotTimestamp, pilotId } = pilot;
    const subtractDatetime: number =
      Number(new Date()) - Number(new Date(atr_snapshotTimestamp));
    const subtractTimeInMinutes = Number(subtractDatetime / 1000 / 60);
    if (subtractTimeInMinutes > 10) {
      // Remove `expired` pilot
      instance.map.delete(pilotId);
    } else {
      // Push this pilot
      pilots.push(pilot);
    }
  }

  // Return pilots
  return pilots;
}
