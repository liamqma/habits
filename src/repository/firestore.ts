import firebase from "../utils/firebase";
import { Item } from "../types";

export function getAll(uid: string): Promise<Array<Item>> {
    return firebase
        .firestore()
        .collection("habits")
        .where("uid", "==", uid)
        .get()
        .then((querySnapshot) => {
            const items: Array<Item> = [];
            querySnapshot.forEach((document) => {
                const data = document.data();
                items.push({
                    id: document.id,
                    name: data.name,
                    doneDates:
                        data.doneDates?.map(
                            (doneDate: firebase.firestore.Timestamp) => {
                                return doneDate.toDate();
                            }
                        ) || [],
                });
            });
            return items;
        });
}

export function add(uid: string, name: string): Promise<Item> {
    return firebase
        .firestore()
        .collection("habits")
        .add({
            uid,
            name,
            doneDates: [],
            created: firebase.firestore.Timestamp.now(),
        })
        .then(function (docRef) {
            return {
                id: docRef.id,
                uid,
                name,
                doneDates: [],
            };
        });
}

export function update(id: string, name: string): void {
    firebase.firestore().collection("habits").doc(id).set(
        {
            name,
        },
        { merge: true }
    );
}

export function remove(id: string): void {
    firebase.firestore().collection("habits").doc(id).delete();
}
