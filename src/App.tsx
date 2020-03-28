import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useCookie } from "@use-hook/use-cookie";
import { Item } from "./types";
import Home from "./Home/index";
import Add from "./Add/index";
import isToday from "./util/isToday";
import styled, { createGlobalStyle } from "styled-components";

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
    const [data, setData] = useCookie("items", JSON.stringify([]));

    let items: Array<Item>;
    try {
        items = JSON.parse(data);
    } catch (error) {
        items = [];
    }

    function add(name: string): void {
        items.push({ name, doneDates: [] });
        setData(JSON.stringify(items), { expires: 365 });
    }

    function remove(name: string): void {
        items = items.filter((item) => item.name !== name);
        setData(JSON.stringify(items), { expires: 365 });
    }

    function done(name: string): void {
        items = items.map((item) => {
            if (item.name === name) {
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
        });

        setData(JSON.stringify(items), { expires: 365 });
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
