import { useState, useEffect } from "react";
import { User } from "firebase";
import * as db from "../repository/firestore";
import * as store from "../repository/inMemory";
import { Item } from "../types";
import isDoneToday from "../utils/isDoneToday";

interface DBState {
    items: Array<Item>;
    add: Function;
    edit: Function;
    remove: Function;
    done: Function;
    unDone: Function;
    dismissError: Function;
    error: Error | null;
    isLoading: boolean;
}

export default function useDB(user: User | null): DBState {
    const [items, setItems] = useState<Array<Item>>([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            setItems(store.update(items, id, name));
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
            setItems(store.addDoneDate(items, id));
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

    return {
        items,
        add,
        edit,
        remove,
        done,
        unDone,
        error,
        dismissError,
        isLoading,
    };
}