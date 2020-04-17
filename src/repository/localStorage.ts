import { Item, DBItem } from "../types";
import window from "global/window";

const DATABASE_NAME = "habits_database";

export function getItems(): Array<Item> {
    const dataFromDatabase = window.localStorage.getItem(DATABASE_NAME);
    if (dataFromDatabase) {
        let data;
        try {
            data = JSON.parse(dataFromDatabase);
        } catch (error) {
            // fail siently 🤫
        }
        if (Array.isArray(data) && data.length) {
            return data.map(
                (item: DBItem): Item => {
                    return {
                        ...item,
                        doneDates: item.doneDates.map(
                            (doneDate: string) => new Date(doneDate)
                        ),
                    };
                }
            );
        }
    }
    return [];
}

export function saveItems(items: Array<Item>): void {
    const data = items.map((item) => {
        return {
            ...item,
            doneDates: item.doneDates.map((doneDate) => doneDate.toString()),
        };
    });
    window.localStorage.setItem(DATABASE_NAME, JSON.stringify(data));
}
