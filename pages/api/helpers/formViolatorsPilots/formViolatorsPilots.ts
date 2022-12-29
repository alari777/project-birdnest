import { ViolatorType } from '../../../../types/violators.type';
import { Pilots } from '../../classes/Pilots.class';

export function formViolatorsPilots(): ViolatorType[] {
    const instance = Pilots.init();
    const pilots: ViolatorType[] = [];
    for (let pilot of instance.map.values()) {
        const { atr_snapshotTimestamp, pilotId } = pilot;
        const subtractDatetime: number = Number(new Date()) - Number(new Date(atr_snapshotTimestamp));
        const subtractTimeInMinutes = Number(subtractDatetime / 1000 / 60);
        if (subtractTimeInMinutes > 10) {
            instance.map.delete(pilotId);
        } else {
            pilots.push(pilot);
        }
    }

    return pilots;
}
