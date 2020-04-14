import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { User } from "firebase";
import firebase from "../utils/firebase";
import { Item } from "../types";
import Home from "../Home/index";
import Add from "../Add/index";
import Edit from "../Edit/index";
import Login from "../Login/index";
import { GlobalStyle, LogoLink, H1, Page, UserLink } from "./App.styles";
import {
    add as addItem,
    update as updateItem,
    remove as removeItem,
    done as doneItems,
    unDone as unDoneItems,
} from "../utils/item";
import { getItems, saveItems } from "../repository/firebase";

function App(): JSX.Element {
    const [items, setItems] = useState<Array<Item>>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            getItems(user.uid).then((items): void => {
                setItems(items);
            });
        }
    }, [user]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    useEffect(() => {
        if (user?.uid) {
            saveItems(user.uid, items);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    function logout(event: React.MouseEvent): void {
        event.preventDefault();
        firebase.auth().signOut();
    }

    return (
        <Router>
            <>
                <LogoLink to="/">
                    <H1>Habits</H1>
                </LogoLink>
                {user ? (
                    <UserLink to="/" onClick={logout}>
                        Logout
                    </UserLink>
                ) : (
                    <UserLink to="/login">Login</UserLink>
                )}
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
