import React from "react";
import { Item } from "../../../types";

interface Props {
    items: Array<Item>;
}

export default function Summary({ items }: Props): JSX.Element | null {
    return (
        <>
            {items.map((item: Item) => (
                <div key={item.id}>
                    <div data-testid={`${item.id}-name`}>{item.name}</div>
                    <div data-testid={`${item.id}-dates`}>
                        {item.doneDates.length}
                    </div>
                </div>
            ))}
        </>
    );
}
