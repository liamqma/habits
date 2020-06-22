import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";

export const UserLinks = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

interface Props {
    user: User | null;
}

export default function App({ user }: Props): JSX.Element {
    const history = useHistory();

    function logout(event: React.MouseEvent): void {
        event.preventDefault();
        firebase
            .auth()
            .signOut()
            .then((): void => {
                history.push("/login");
            });
    }

    const Inner = user ? (
        <>
            <Link to="/" onClick={logout}>
                Logout
            </Link>{" "}
            | <Link to="/complete">Complete</Link>
        </>
    ) : (
        <Link to="/login">Login</Link>
    );

    return <UserLinks>{Inner}</UserLinks>;
}
