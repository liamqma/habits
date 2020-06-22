export interface Item {
    id: string;
    name: string;
    status: Status.active | Status.complete;
    doneDates: Date[];
}

export enum Status {
    active = "active",
    complete = "complete",
}
