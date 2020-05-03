import React from "react";
import { render, wait } from "@testing-library/react";
import { getAll } from "../../repository/firestore";
import App from "./App";

function mockedLoading(): JSX.Element {
    return <div>Loading</div>;
}

jest.mock("../../repository/firestore", () => {
    return {
        getAll: jest.fn(),
    };
});

jest.mock("../../utils/firebase", () => {
    const auth = (): object => ({
        onAuthStateChanged: (callback: Function): Function => {
            callback({
                uid: "foo",
            });
            return jest.fn();
        },
    });
    auth.GoogleAuthProvider = jest.fn();

    return {
        auth,
    };
});

jest.mock("../Loading/index", () => {
    return mockedLoading;
});

test("render logo, items", async () => {
    (getAll as jest.Mock).mockReturnValueOnce(
        Promise.resolve([{ id: "12345", name: "Read a book", doneDates: [] }])
    );

    const { getByText, getAllByText, queryByText } = render(<App />);

    // display Loading
    getByText(/loading/i);

    // renders logo
    getByText(/habits/i);

    await wait(() => {
        // renders list
        getAllByText(/Read a book/i);
    });

    expect(queryByText(/loading/i)).not.toBeInTheDocument();
});
