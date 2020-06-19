import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaGoogle, FaUserCircle } from "react-icons/fa";
import { User } from "firebase";
import { Redirect } from "react-router-dom";
import firebase from "../../utils/firebase";

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

const Wrapper = styled.div`
    padding: 5px;
`;

const Button = styled.button`
    width: 200px;
    color: #fff;
    padding: 15px 15px 15px 35px;
    border-radius: 5px;
    background-color: #de4e3b;
    font-weight: 600;
    position: relative;
    display: block;
    margin: 10px auto;
    min-width: 180px;

    svg {
        position: absolute;
        top: 17px;
        left: 15px;
    }
`;

const GoogleSocialButton = styled(Button)`
    background-color: #de4e3b;
`;

const AnonymousButton = styled(Button)`
    background-color: grey;
`;

interface Props {
    user: User | null;
}

function Login({ user }: Props): JSX.Element {
    const history = useHistory();

    function onGoogleButtonClick(): void {
        firebase
            .auth()
            .signInWithPopup(GoogleAuthProvider)
            .then(function () {
                history.push("/");
            });
    }

    function onAnonymousButtonClick(): void {
        firebase
            .auth()
            .signInAnonymously()
            .then(function () {
                history.push("/");
            });
    }

    return user ? (
        <Redirect to="/" />
    ) : (
        <Wrapper>
            <GoogleSocialButton onClick={onGoogleButtonClick}>
                <FaGoogle /> Sign in with Google
            </GoogleSocialButton>
            <AnonymousButton onClick={onAnonymousButtonClick}>
                <FaUserCircle /> Sign in Anonymously
            </AnonymousButton>
        </Wrapper>
    );
}

export default Login;
