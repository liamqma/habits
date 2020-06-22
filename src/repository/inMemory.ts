import { Item, Status } from "../types";

export function update(
    items: Array<Item>,
    id: string,
    update: { name?: string; status?: Status.active | Status.complete }
): Array<Item> {
    return [...items].map((item) => {
        if (item.id === id) {
            return {
                ...item,
                ...update,
            };
        }
        return item;
    });
}

export function remove(items: Array<Item>, id: string): Array<Item> {
    return items.filter((item) => item.id !== id);
}

export function addDoneDate(items: Array<Item>, id: string): Array<Item> {
    return [...items].map((item) => {
        if (item.id === id) {
            return {
                ...item,
                doneDates: [...item.doneDates, new Date()],
            };
        }
        return item;
    });
}

export function removeDoneDate(items: Array<Item>, id: string): Array<Item> {
    return [...items].map((item) => {
        if (item.id === id) {
            return {
                ...item,
                doneDates: item.doneDates.slice(0, item.doneDates.length - 1),
            };
        }
        return item;
    });
}
