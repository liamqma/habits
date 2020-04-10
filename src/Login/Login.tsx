import React from "react";
import firebase from "../utils/firebase";

const provider = new firebase.auth.GoogleAuthProvider();

function Login(): JSX.Element {
    function onClick(): void {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                console.log(result);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return <button onClick={onClick}>Login</button>;
}

export default Login;
