import { Item } from "../types";

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

export function remove(items: Array<Item>, id: string): Array<Item> {
    return items.filter((item) => item.id !== id);
}

export function addDoneDate(items: Array<Item>, id: string): Array<Item> {
    return items.map((item) => {
        if (item.id === id) {
            item.doneDates.push(new Date());
        }
        return item;
    });
}

export function removeDoneDate(items: Array<Item>, id: string): Array<Item> {
    return items.map((item) => {
        if (item.id === id) {
            item.doneDates.pop();
        }
        return item;
    });
}
