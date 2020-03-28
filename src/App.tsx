import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useCookie } from "@use-hook/use-cookie";
import { Item } from "./types";
import Home from "./Home/index";
import Add from "./Add/index";
import isToday from "./util/isToday";
import "./App.css";

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
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
            </>
        </Router>
    );
}

export default App;
