import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User } from "firebase";
import firebase from "../utils/firebase";
import { Item } from "../types";
import Home from "../Home/index";
import Add from "../Add/index";
import Edit from "../Edit/index";
import Login from "../Login/index";
import UserButton from "../UserButton/index";
import { GlobalStyle, LogoLink, H1, Page } from "./App.styles";
import isDoneToday from "../utils/isDoneToday";
import * as db from "../repository/firestore";
import * as store from "../repository/inMemory";

function App(): JSX.Element {
    const [items, setItems] = useState<Array<Item>>([]);
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        if (user) {
            db.getAll(user.uid).then((items): void => {
                setItems(items);
            });
        }
    }, [user]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
    }, []);

    function add(name: string): void {
        if (user && name) {
            db.add(user.uid, name).then((item) => {
                setItems([...items, item]);
            });
        }
    }

    function edit(id: string, name: string): void {
        if (name) {
            db.update(id, name);
            setItems(store.update(items, id, name));
        }
    }

    function remove(id: string): void {
        db.remove(id);
        setItems(store.remove(items, id));
    }

    function done(id: string): void {
        const item = items.find((item) => item.id === id);
        if (item && !isDoneToday(item)) {
            db.addDoneDate(id);
            setItems(store.addDoneDate(items, id));
        }
    }

    function unDone(id: string): void {
        const item = items.find((item) => item.id === id);
        if (item && isDoneToday(item)) {
            db.removeDoneDate(id, item.doneDates[item.doneDates.length - 1]);
            setItems(store.removeDoneDate(items, id));
        }
    }

    return (
        <Router>
            <>
                <LogoLink to="/">
                    <H1>Habits</H1>
                </LogoLink>
                <UserButton user={user} />
                <Page>
                    <Switch>
                        <Route path="/add">
                            <Add add={add} />
                        </Route>
                        <Route path="/edit/:id">
                            <Edit edit={edit} remove={remove} items={items} />
                        </Route>
                        <Route path="/login">
                            <Login user={user} />
                        </Route>
                        <Route path="/">
                            <Home
                                user={user}
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
