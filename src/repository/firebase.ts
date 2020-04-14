import firebase from "../utils/firebase";
import { Item, DBItem } from "../types";

export function getItems(uid: string): Promise<Array<Item>> {
    return firebase
        .database()
        .ref(`/users/${uid}`)
        .once("value")
        .then((snapshot) => {
            const items = snapshot.val()?.items || [];
            if (items.length) {
                return items.map(
                    (item: DBItem): Item => {
                        return {
                            ...item,
                            doneDates:
                                item.doneDates?.map(
                                    (doneDate: string): Date =>
                                        new Date(doneDate)
                                ) || [],
                        };
                    }
                );
            }
            return items;
        });
}

export function saveItems(uid: string, items: Array<Item>): void {
    const data = items.map(
        (item: Item): DBItem => {
            return {
                ...item,
                doneDates: item.doneDates.map((doneDate) =>
                    doneDate.toString()
                ),
            };
        }
    );
    firebase.database().ref(`/users/${uid}`).set({
        items: data,
    });
}
