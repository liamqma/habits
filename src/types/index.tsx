export interface Item {
    id: string;
    name: string;
    doneDates: Date[];
}

export interface DBItem {
    id: string;
    name: string;
    doneDates: string[];
}
