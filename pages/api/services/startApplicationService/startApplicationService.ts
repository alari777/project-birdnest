import { getDrones } from '../../utils/getdrones/getDrones';
import { getViolatorsPilots } from '../../helpers/getViolatorsPilots/getViolatorsPilots';
import { Pilots } from '../../classes/Pilots.class';

export async function startApplicationService(): Promise<void> {
  const instance = Pilots.init();
  // This micro-service starts `loop` to fetch:
  // 1. getting array of violators drones using function `getDrones()`;
  // 2. if this array is not empty so we get full information about violator pilot.
  const timerId: NodeJS.Timeout = setTimeout(async (): Promise<void> => {
    const { violators, atrSnapshotTimestamp } = await getDrones();

    if (violators.length !== 0) {
      await getViolatorsPilots(violators);
    }

    // Set/update snapshot time at the current instance
    instance.atrSnapshotTimestamp = atrSnapshotTimestamp;

    clearTimeout(timerId);

    await startApplicationService();
  }, 2000);
}
