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
    padding: 15px 15px 15px 30px;
    line-height: 1.2;
    transition: color 0.4s;

    :disabled {
        text-decoration: line-through;
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
    transition: color 0.2s ease-out;
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
