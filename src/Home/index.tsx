import React from "react";
import styled from "styled-components";
import Add from "../Add/index";
import { Item } from "../types";
import isToday from "../util/isToday";

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;

    li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }
`;

const NameButton = styled.button`
    word-break: break-all;
    padding: 15px 15px 15px 50px;
    line-height: 1.2;
    transition: color 0.4s;
    position: relative;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;

    :disabled {
        text-decoration: line-through;
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    margin: auto 0;
    font-size: 30px;
    color: #cc9a9a;
    margin-bottom: 11px;
`;

const Table = styled.table`
    margin: 0 auto;
    width: 100%;
    text-align: left;
    border-spacing: 0;
    border-collapse: collapse;
    tr:first-child th {
        border-bottom: 1px solid #65cec8;
        padding: 15px 15px;
        background-color: #ffffff44;
        font-size: 1.1em;
    }
    tr td,
    tr:not(:first-child) th {
        padding: 12px 20px;
        position: relative;
        font-weight: normal;
    }
    tr:not(:first-child) th {
        transition: all 1s ease-out;
    }

    .tr td::after,
    .tr:not(first-child) th::after {
        width: 0;
        height: 2px;
        background-color: #ffffff22;
        content: " ";
        position: absolute;
        bottom: 0;
        left: 0;
        transition: width 0.1s ease-out 0.2s, height 0.2s ease 0.4s;
    }
`;

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
        if (window.confirm("Do you really want to delete permanently?")) {
            remove(name);
        }
    }

    return (
        <>
            <Add add={add} />
            {items.length ? (
                <List>
                    {items.map((item: Item) => (
                        <li key={item.name}>
                            <NameButton
                                disabled={isDoneToday(item)}
                                onClick={(): void => done(item.name)}
                            >
                                {item.name}
                            </NameButton>
                            <RemoveButton
                                onClick={(): void => confirmRemove(item.name)}
                            >
                                x
                            </RemoveButton>
                        </li>
                    ))}
                </List>
            ) : null}
            {items.length ? (
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Total days:</th>
                            <th>Consecutive days:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: Item) => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.doneDates.length}</td>
                                <td>?</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : null}
        </>
    );
}

export default Home;