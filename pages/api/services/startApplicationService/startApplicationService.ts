import { getDrones } from "../../utils/getdrones/getDrones";
import { getViolatorsPilots } from "../../helpers/getViolatorsPilots/getViolatorsPilots";
import { Pilots } from "../../classes/Pilots.class";

export async function startApplicationService(): Promise<void> {
    const instance = Pilots.init();
    const timerId: NodeJS.Timeout = setTimeout(async (): Promise<void> => {
        const { violators, atrSnapshotTimestamp } = await getDrones();

        if (violators.length !== 0) {
            await getViolatorsPilots(violators);
        }

        instance.atrSnapshotTimestamp = atrSnapshotTimestamp;

        clearTimeout(timerId);

        await startApplicationService();
    }, 2000);
}
