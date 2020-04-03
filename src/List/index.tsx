import React from "react";
import styled from "styled-components";
import { Item } from "../types";
import isDoneToday from "../utils/isDoneToday";

const ItemList = styled.ul`
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
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center left;
`;

const DoneNameButton = styled(NameButton)`
    text-decoration: line-through;
    background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
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

interface Props {
    items: Array<Item>;
    remove: Function;
    done: Function;
    unDone: Function;
}

function List({ items, remove, done, unDone }: Props): JSX.Element | null {
    if (items.length === 0) {
        return null;
    }

    function confirmRemove(id: string): void {
        if (window.confirm("Do you really want to delete permanently?")) {
            remove(id);
        }
    }

    return (
        <ItemList>
            {items.map((item: Item) => (
                <li key={item.id}>
                    {isDoneToday(item) ? (
                        <DoneNameButton onClick={(): void => unDone(item.id)}>
                            {item.name}
                        </DoneNameButton>
                    ) : (
                        <NameButton onClick={(): void => done(item.id)}>
                            {item.name}
                        </NameButton>
                    )}
                    <RemoveButton onClick={(): void => confirmRemove(item.id)}>
                        x
                    </RemoveButton>
                </li>
            ))}
        </ItemList>
    );
}

export default List;
