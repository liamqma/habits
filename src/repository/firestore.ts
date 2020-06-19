import firebase from "../utils/firebase";
import { Item, Status } from "../types";

export function getAll(uid: string): Promise<Array<Item>> {
    return firebase
        .firestore()
        .collection("habits")
        .where("uid", "==", uid)
        .where("status", "==", Status.active)
        .orderBy("created", "desc")
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
            status: Status.active,
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

export function update(id: string, name: string): Promise<void> {
    return firebase.firestore().collection("habits").doc(id).set(
        {
            name,
        },
        { merge: true }
    );
}

export function complete(id: string): Promise<void> {
    return firebase.firestore().collection("habits").doc(id).set(
        {
            status: Status.complete,
        },
        { merge: true }
    );
}

export function remove(id: string): Promise<void> {
    return firebase.firestore().collection("habits").doc(id).delete();
}

export function addDoneDate(id: string): Promise<void> {
    return firebase
        .firestore()
        .collection("habits")
        .doc(id)
        .update({
            doneDates: firebase.firestore.FieldValue.arrayUnion(
                firebase.firestore.Timestamp.now()
            ),
        });
}

export function removeDoneDate(id: string, doneDate: Date): Promise<void> {
    return firebase
        .firestore()
        .collection("habits")
        .doc(id)
        .update({
            doneDates: firebase.firestore.FieldValue.arrayRemove(
                firebase.firestore.Timestamp.fromDate(doneDate)
            ),
        });
}
