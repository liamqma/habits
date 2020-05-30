import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import window from "global/window";
import Home from "../Home/index";
import Add from "../Add/index";
import Edit from "../Edit/index";
import Login from "../Login/index";
import UserButton from "../UserButton/index";
import Loading from "../Loading/index";
import { GlobalStyle, LogoLink, H1, Page, SmallLoading } from "./App.styles";
import useAuth from "../../hooks/use-auth";
import useDB from "../../hooks/use-db";

function App(): JSX.Element {
    const { user, authStatusReported } = useAuth();
    const {
        items,
        add,
        edit,
        remove,
        done,
        unDone,
        isLoading,
        error,
        dismissError,
    } = useDB(user);

    if (error) {
        dismissError();
        window.alert(error.message);
    }

    if (authStatusReported === false) {
        return <Loading />;
    }

    return (
        <Router>
            <>
                <LogoLink to="/">
                    <H1>Habits</H1>
                </LogoLink>
                {isLoading && <SmallLoading />}
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
