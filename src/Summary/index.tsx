import React from "react";
import styled from "styled-components";
import { Item } from "../types";
import getConsecutiveDays from "../utils/getConsecutiveDays";

const Table = styled.table`
    margin: 0 auto;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    tr:first-child th {
        border-bottom: 1px solid #ededed;
        padding: 15px 15px;
        font-weight: normal;
    }
    tr td,
    tr:not(:first-child) th {
        padding: 12px 20px;
        font-weight: normal;
    }
`;

interface Props {
    items: Array<Item>;
}

function Summary({ items }: Props): JSX.Element | null {
    if (items.length === 0) {
        return null;
    }

    return (
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
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.doneDates.length}</td>
                        <td>{getConsecutiveDays(item.doneDates)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Summary;
