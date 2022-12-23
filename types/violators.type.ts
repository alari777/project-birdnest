export type ViolatorType = {
    pilotId: string;
    firstName: string;
    phoneNumber: string;
    email: string;

    lastName?: string;
    createdDt?: string;
    atr_snapshotTimestamp?: string;
    distance?: number;
    status?: string;
    previousDistance?: string;
}

export type FetchResultPilotsType = {
    pilots: ViolatorType[];
    atr_snapshotTimestamp: string;
}

export type DroneType = {
    positionX: number;
    positionY: number;
    newDistance: number;
    serialNumber?: string;
}

export type DronesType = {
    report: {
        capture: {
            atr_snapshotTimestamp: string;
            drone: DroneType[];
        }
    }
}

export type BootstrapType = {
    pilots: ViolatorType[];
    atr_snapshotTimestamp: string;
}
