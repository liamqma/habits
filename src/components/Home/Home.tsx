import React from "react";
import { User } from "firebase";
import Add from "../Add/index";
import About from "../About/About";
import List from "./List";
import Summary from "./Summary";
import { Item, Status } from "../../types";

interface Props {
    items: Array<Item>;
    add: Function;
    done: Function;
    unDone: Function;
    user: User | null;
}

function Home({ user, items, add, done, unDone }: Props): JSX.Element {
    const activeItems = items.filter((item) => item.status === Status.active);
    return user ? (
        <>
            <Add add={add} />
            <List items={activeItems} done={done} unDone={unDone} />
            <Summary items={activeItems} />
        </>
    ) : (
        <About />
    );
}

export default Home;
