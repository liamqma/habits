import React from "react";
import Add from "../Add/index";
import List from "../List/index";
import Summary from "../Summary/index";
import { Item } from "../types";

interface Props {
    items: Array<Item>;
    add: Function;
    done: Function;
    unDone: Function;
}

function Home({ items, add, done, unDone }: Props): JSX.Element {
    return (
        <>
            <Add add={add} />
            <List items={items} done={done} unDone={unDone} />
            <Summary items={items} />
        </>
    );
}

export default Home;