import React from "react";
import Add from "../Add/index";
import { Item } from "../types";
import isToday from "../util/isToday";

interface Props {
    items: Array<Item>;
    add: Function;
    remove: Function;
    done: Function;
}

function isDoneToday(item: Item): boolean {
    if (item.doneDates[item.doneDates.length - 1]) {
        return isToday(new Date(item.doneDates[item.doneDates.length - 1]));
    }
    return false;
}

function Home({ items, add, remove, done }: Props): JSX.Element {
    function confirmRemove(name: string): void {
        if (window.confirm("Do you really want to delete?")) {
            remove(name);
        }
    }

    return (
        <>
            <ul>
                {items.map((item: Item) => (
                    <li key={item.name}>
                        {isDoneToday(item) ? <del>{item.name}</del> : item.name}
                        <button
                            disabled={isDoneToday(item)}
                            onClick={(): void => done(item.name)}
                        >
                            Mark as done
                        </button>
                        <button onClick={(): void => confirmRemove(item.name)}>
                            Delete permanently
                        </button>
                    </li>
                ))}
            </ul>
            <Add add={add} />
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Total count:</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: Item) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.doneDates.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;
