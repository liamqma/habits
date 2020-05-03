import { useState, useEffect } from "react";
import { Item } from "../types";
import * as db from "../repository/firestore";

export default function useRecipe(
    uid: string
): { loading: boolean; items: Array<Item> } {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Array<Item>>([]);

    useEffect(() => {
        db.getAll(uid).then((items): void => {
            setLoading(false);
            setItems(items);
        });
    }, [uid]);

    return {
        loading,
        items,
    };
}
