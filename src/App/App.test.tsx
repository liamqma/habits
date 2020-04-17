import React from "react";
import { render, wait } from "@testing-library/react";
import { getItems } from "../repository/firebase";
import App from "./App";

jest.mock("../repository/firebase", () => {
    return {
        saveItems: jest.fn(),
        getItems: jest.fn(),
    };
});

jest.mock("../utils/firebase", () => {
    const auth = (): object => ({
        onAuthStateChanged: (callback: Function): void => {
            callback({
                uid: "foo",
            });
        },
    });
    auth.GoogleAuthProvider = jest.fn();

    return {
        auth,
    };
});

test("renders Items from database", async () => {
    (getItems as jest.Mock).mockReturnValueOnce(
        Promise.resolve([{ id: "12345", name: "Read a book", doneDates: [] }])
    );

    const { getAllByText } = render(<App />);
    await wait();
    getAllByText(/Read a book/i);
});
