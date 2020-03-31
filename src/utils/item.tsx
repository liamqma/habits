import { Item } from "../types";
import createId from "./createId";
import isToday from "./isToday";

export function add(items: Array<Item>, itemName: string): Array<Item> {
    if (itemName) {
        return [
            ...items,
            {
                id: createId(),
                name: itemName,
                doneDates: [],
            },
        ];
    }
    return items;
}

export function remove(items: Array<Item>, itemId: string): Array<Item> {
    return items.filter((item) => item.id !== itemId);
}

export function done(items: Array<Item>, itemId: string): Array<Item> {
    return items.map((item) => {
        if (item.id === itemId) {
            if (item?.doneDates.length === 0) {
                item.doneDates.push(new Date().toString());
            } else if (
                !isToday(new Date(item.doneDates[item.doneDates.length - 1]))
            ) {
                item.doneDates.push(new Date().toString());
            }
        }
        return item;
    });
}
