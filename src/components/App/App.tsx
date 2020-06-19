import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import swal from "sweetalert";
import Home from "../Home/index";
import Add from "../Add/index";
import Edit from "../Edit/index";
import Login from "../Login/index";
import UserButton from "../UserButton/index";
import Loading from "../Loading/Loading";
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
        complete,
        done,
        unDone,
        isLoading,
        error,
        dismissError,
        showAllDone,
        dismissAllDone,
    } = useDB(user);

    if (error) {
        dismissError();
        swal(
            "Ah, this is awkward. We've got an error.",
            error.message,
            "error"
        );
    }

    if (showAllDone) {
        dismissAllDone();
        swal({
            title: "Congratulations! Your leveled up!",
            icon: "success",
        });
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
                            <Edit
                                edit={edit}
                                remove={remove}
                                items={items}
                                complete={complete}
                            />
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
