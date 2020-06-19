export interface Item {
    id: string;
    name: string;
    doneDates: Date[];
}

export enum Status {
    active = "active",
    complete = "complete",
}
