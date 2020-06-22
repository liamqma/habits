import React from "react";
import { User } from "firebase";
import { Redirect } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";
import { LinkButton, ItemList } from "../Home/List";
import { Item, Status } from "../../types";

const CustomItemList = styled(ItemList)`
    li {
        padding: 15px 50px;
        line-height: 1.2;

        &:last-child {
            border: 0;
        }
    }
`;

interface Props {
    items: Array<Item>;
    user: User | null;
}

function Complete({ user, items }: Props): JSX.Element | null {
    const completeItems = items.filter((item) => item.status !== Status.active);

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (completeItems.length === 0) {
        return null;
    }

    return (
        <CustomItemList>
            {completeItems.map((item: Item) => (
                <li key={item.id}>
                    {item.name}
                    <LinkButton to={`/edit/${item.id}`}>
                        <FaEdit />
                    </LinkButton>
                </li>
            ))}
        </CustomItemList>
    );
}

export default Complete;
