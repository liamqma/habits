import { useState, useEffect } from "react";
import firebase from "../utils/firebase";
import { User } from "firebase";

interface AuthState {
    user: User | null;
    authStatusReported: boolean;
}

export default function useAuth(): AuthState {
    const [state, setState] = useState(() => {
        const user = firebase.auth().currentUser;
        return { authStatusReported: !!user, user };
    });
    function onChange(user: User | null): void {
        setState({ authStatusReported: true, user });
    }

    useEffect(() => {
        // listen for auth state changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        // unsubscribe to the listener when unmounting
        return (): void => unsubscribe();
    }, []);

    return state;
}
