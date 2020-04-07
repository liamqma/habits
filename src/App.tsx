import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Item } from "./types";
import Home from "./Home/index";
import Add from "./Add/index";
import Edit from "./Edit/index";
import Login from "./Login/index";
import {
    add as addItem,
    update as updateItem,
    remove as removeItem,
    done as doneItems,
    unDone as unDoneItems,
} from "./utils/item";
import { getItems, saveItems } from "./utils/db";

const GlobalStyle = createGlobalStyle`
    html,
    body {
        margin: 0;
        padding: 0;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        appearance: none;
    }

    body {
        font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
    }

    :focus {
        outline: 0;
    }
`;

const LogoLink = styled(Link)`
    text-decoration: none;
`;

const H1 = styled.h1`
    width: 100%;
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
`;

const Page = styled.section`
    background: #fff;
    margin: 0 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

function App(): JSX.Element {
    const [items, setItems] = useState<Array<Item>>([]);

    useEffect(() => {
        setItems(getItems());
    }, []);

    useEffect(() => {
        saveItems(items);
    }, [items]);

    function add(name: string): void {
        setItems(addItem(items, name));
    }

    function edit(id: string, name: string): void {
        setItems(updateItem(items, id, name));
    }

    function remove(id: string): void {
        setItems(removeItem(items, id));
    }

    function done(id: string): void {
        setItems(doneItems(items, id));
    }

    function unDone(id: string): void {
        setItems(unDoneItems(items, id));
    }

    return (
        <Router>
            <>
                <LogoLink to="/">
                    <H1>Habits</H1>
                </LogoLink>
                <Page>
                    <Switch>
                        <Route path="/add">
                            <Add add={add} />
                        </Route>
                        <Route path="/edit/:id">
                            <Edit edit={edit} remove={remove} items={items} />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/">
                            <Home
                                items={items}
                                add={add}
                                done={done}
                                unDone={unDone}
                            />
                        </Route>
                    </Switch>
                </Page>
                <GlobalStyle />
            </>
        </Router>
    );
}

export default App;
