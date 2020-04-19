import { Item } from "../types";
import isToday from "./isToday";

export function remove(items: Array<Item>, id: string): Array<Item> {
    return items.filter((item) => item.id !== id);
}

export function update(
    items: Array<Item>,
    id: string,
    name: string
): Array<Item> {
    return [...items].map((item) => {
        if (item.id === id) {
            return {
                ...item,
                name,
            };
        }
        return item;
    });
}

export function done(items: Array<Item>, id: string): Array<Item> {
    return items.map((item) => {
        if (item.id === id) {
            if (item?.doneDates.length === 0) {
                item.doneDates.push(new Date());
            } else if (
                !isToday(new Date(item.doneDates[item.doneDates.length - 1]))
            ) {
                item.doneDates.push(new Date());
            }
        }
        return item;
    });
}

export function unDone(items: Array<Item>, id: string): Array<Item> {
    return items.map((item) => {
        if (item.id === id) {
            if (
                item?.doneDates.length !== 0 &&
                isToday(new Date(item.doneDates[item.doneDates.length - 1]))
            ) {
                item.doneDates.pop();
            }
        }
        return item;
    });
}
