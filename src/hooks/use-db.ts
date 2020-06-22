import { useState, useEffect } from "react";
import { User } from "firebase";
import * as db from "../repository/firestore";
import * as store from "../repository/inMemory";
import { Item, Status } from "../types";
import { isDoneToday, isTodayAllDone } from "../utils/today";

interface DBState {
    items: Array<Item>;
    add: Function;
    edit: Function;
    complete: Function;
    remove: Function;
    done: Function;
    unDone: Function;
    dismissError: Function;
    error: Error | null;
    isLoading: boolean;
    showAllDone: boolean;
    dismissAllDone: Function;
}

export default function useDB(user: User | null): DBState {
    const [items, setItems] = useState<Array<Item>>([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showAllDone, setShowAllDone] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            db.getAll(user.uid)
                .then((items): void => {
                    setIsLoading(false);
                    setItems(items);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }, [user]);

    function add(name: string): void {
        if (user && name) {
            setIsLoading(true);
            db.add(user.uid, name)
                .then((item) => {
                    setIsLoading(false);
                    setItems([...items, item]);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }

    function edit(id: string, name: string): void {
        if (name) {
            setItems(store.update(items, id, { name }));
            setIsLoading(true);
            db.update(id, name)
                .then(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }

    function complete(id: string): void {
        setItems(store.update(items, id, { status: Status.complete }));
        setIsLoading(true);
        db.complete(id)
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    }

    function remove(id: string): void {
        setItems(store.remove(items, id));
        setIsLoading(true);
        db.remove(id)
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError(error);
            });
    }

    function done(id: string): void {
        const item = items.find((item) => item.id === id);
        if (item && !isDoneToday(item)) {
            const newItems = store.addDoneDate(items, id);
            if (isTodayAllDone(newItems)) {
                setShowAllDone(true);
            }
            setItems(newItems);
            setIsLoading(true);
            db.addDoneDate(id)
                .then(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }

    function unDone(id: string): void {
        const item = items.find((item) => item.id === id);
        if (item && isDoneToday(item)) {
            setIsLoading(true);
            setItems(store.removeDoneDate(items, id));
            db.removeDoneDate(id, item.doneDates[item.doneDates.length - 1])
                .then(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setError(error);
                });
        }
    }

    function dismissError(): void {
        setError(null);
    }

    function dismissAllDone(): void {
        setShowAllDone(false);
    }

    return {
        items,
        add,
        edit,
        complete,
        remove,
        done,
        unDone,
        error,
        dismissError,
        isLoading,
        showAllDone,
        dismissAllDone,
    };
}
