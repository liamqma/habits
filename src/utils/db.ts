import Cookies from "js-cookie";
import { Item } from "../types";

const COOKIE_NAME = "DATA";

export function getItems(): Array<Item> {
    const dataFromCookie = Cookies.get(COOKIE_NAME);
    if (dataFromCookie) {
        let data;
        try {
            data = JSON.parse(dataFromCookie);
        } catch (error) {
            // fail siently 🤫
        }
        if (Array.isArray(data) && data.length) {
            return data.map((item) => {
                return {
                    ...item,
                    doneDates: item.doneDates.map(
                        (doneDate: string) => new Date(doneDate)
                    ),
                };
            });
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
    Cookies.set(COOKIE_NAME, JSON.stringify(data), { expires: 365 });
}
