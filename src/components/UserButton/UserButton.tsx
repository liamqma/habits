import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";

export const UserLink = styled(Link)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

interface Props {
    user?: User;
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

    return user ? (
        <UserLink to="/" onClick={logout}>
            Logout
        </UserLink>
    ) : (
        <UserLink to="/login">Login</UserLink>
    );
}
