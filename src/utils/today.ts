import { Item } from "../types";

export function isToday(someDate: Date): boolean {
    const today = new Date();
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    );
}

export function isDoneToday(item: Item): boolean {
    if (item.doneDates[item.doneDates.length - 1]) {
        return isToday(new Date(item.doneDates[item.doneDates.length - 1]));
    }
    return false;
}

export function isTodayAllDone(items: Array<Item>): boolean {
    if (items.length === 0) return false;
    for (let i = 0; i < items.length; i++) {
        if (!isDoneToday(items[i])) {
            return false;
        }
    }
    return true;
}
