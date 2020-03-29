import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { Item } from "./types";
import Home from "./Home/index";
import Add from "./Add/index";
import isToday from "./utils/isToday";
import createId from "./utils/createId";
import styled, { createGlobalStyle } from "styled-components";

const COOKIE_NAME = "DATA";

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
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

    .hidden {
        display: none;
    }
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
        // get items from Cookie
        const dataFromCookie = Cookies.get(COOKIE_NAME);
        if (dataFromCookie) {
            let data;
            try {
                data = JSON.parse(dataFromCookie);
            } catch (error) {
                // fail siently 🤫
            }
            if (Array.isArray(data) && data.length) {
                setItems(data);
            }
        }
    }, []);

    useEffect(() => {
        Cookies.set(COOKIE_NAME, JSON.stringify(items), { expires: 365 });
    }, [items]);

    function add(name: string): void {
        if (name) {
            setItems([
                ...items,
                {
                    id: createId(),
                    name,
                    doneDates: [],
                },
            ]);
        }
    }

    function remove(id: string): void {
        setItems(items.filter((item) => item.id !== id));
    }

    function done(id: string): void {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    if (item?.doneDates.length === 0) {
                        item.doneDates.push(new Date().toString());
                    } else if (
                        !isToday(
                            new Date(item.doneDates[item.doneDates.length - 1])
                        )
                    ) {
                        item.doneDates.push(new Date().toString());
                    }
                }
                return item;
            })
        );
    }

    function unDone(id: string): void {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    if (
                        item?.doneDates.length !== 0 &&
                        isToday(
                            new Date(item.doneDates[item.doneDates.length - 1])
                        )
                    ) {
                        item.doneDates.pop();
                    }
                }
                return item;
            })
        );
    }

    return (
        <Router>
            <>
                <H1>Habits</H1>
                <Page>
                    <Switch>
                        <Route path="/add">
                            <Add add={add} />
                        </Route>
                        <Route path="/">
                            <Home
                                items={items}
                                add={add}
                                remove={remove}
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
