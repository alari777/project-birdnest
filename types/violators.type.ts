export type ViolotarType = {
    pilotId: string;
    firstName: string;
    phoneNumber: string; 
    email: string;

    lastName?: string;
    createdDt?: string;
    atr_snapshotTimestamp?: string;
    distance?: number;
    status?: string;
    previusDistance?: string;
}

export type FetchResultPilotesType = {
    pilots: ViolotarType[];
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
    pilots: ViolotarType[];
    atr_snapshotTimestamp: string;
}