import React from "react";
import { render } from "@testing-library/react";
import { getItems } from "../repository/localStorage";
import App from "./App";

jest.mock("../repository/localStorage", () => {
    return {
        saveItems: jest.fn(),
        getItems: jest.fn(),
    };
});

jest.mock("../utils/firebase", () => {
    const auth = (): object => ({
        onAuthStateChanged: jest.fn,
    });
    auth.GoogleAuthProvider = jest.fn();

    return {
        auth,
    };
});

test("renders Items from database", () => {
    (getItems as jest.Mock).mockReturnValueOnce([
        { id: "12345", name: "Read a book", doneDates: [] },
    ]);

    const { getAllByText } = render(<App />);
    const elment = getAllByText(/Read a book/i)[0];
    expect(elment).toBeInTheDocument();
});
