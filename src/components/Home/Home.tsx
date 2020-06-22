import React from "react";
import { User } from "firebase";
import { Redirect } from "react-router-dom";
import Add from "../Add/index";
import List from "./List";
import Summary from "./Summary";
import { Item } from "../../types";

interface Props {
    items: Array<Item>;
    add: Function;
    done: Function;
    unDone: Function;
    user: User | null;
}

function Home({ user, items, add, done, unDone }: Props): JSX.Element {
    return user ? (
        <>
            <Add add={add} />
            <List items={items} done={done} unDone={unDone} />
            <Summary items={items} />
        </>
    ) : (
        <Redirect to="/login" />
    );
}

export default Home;
