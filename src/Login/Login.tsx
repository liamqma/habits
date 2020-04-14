import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";

const provider = new firebase.auth.GoogleAuthProvider();

function Login(): JSX.Element {
    const history = useHistory();

    function onClick(): void {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function () {
                history.push("/");
            });
    }

    return <button onClick={onClick}>Sign in with Google account</button>;
}

export default Login;
