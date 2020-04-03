import React from "react";
import styled from "styled-components";
import Add from "../Add/index";
import List from "../List/index";
import Summary from "../Summary/index";
import { Item } from "../types";

interface Props {
    items: Array<Item>;
    add: Function;
    remove: Function;
    done: Function;
    unDone: Function;
}

function Home({ items, add, remove, done, unDone }: Props): JSX.Element {
    return (
        <>
            <Add add={add} />
            <List items={items} remove={remove} done={done} unDone={unDone} />
            <Summary items={items} />
        </>
    );
}

export default Home;
