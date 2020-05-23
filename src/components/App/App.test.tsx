import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getAll, add, update } from "../../repository/firestore";
import useAuth from "../../hooks/use-auth";
import App from "./App";
import { buildItem } from "../../../test/utils/generate";

jest.mock("../../repository/firestore");

jest.mock("../../hooks/use-auth");

jest.mock("global/window", () => ({
    alert: jest.fn(),
    confirm: jest.fn(),
}));

jest.mock("../Loading/index");

test("render list, add item, update item", async () => {
    const fakeItems = [buildItem(), buildItem()];
    const fakeItem = buildItem();
    const fakeItem2 = buildItem();
    const uid = "User A";

    (useAuth as jest.Mock).mockReturnValue({
        user: null,
    });

    const {
        getByText,
        rerender,
        getAllByText,
        getByPlaceholderText,
        getByDisplayValue,
        getByTestId,
        getByRole,
        container,
    } = render(<App />);

    // should show sign in page
    getByText(/sign in with/i);

    (useAuth as jest.Mock).mockReturnValue({
        user: {
            uid,
        },
    });

    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve(fakeItems));

    rerender(<App />);

    await wait(() => {
        // should renders list
        getAllByText(fakeItems[0].name);
    });

    getAllByText(fakeItems[1].name);
    expect(getAll).toBeCalledWith(uid);
    expect(getAll).toBeCalledTimes(1);

    // should add item
    (add as jest.Mock).mockResolvedValueOnce(fakeItem);
    const input = getByPlaceholderText(
        /what habit to develop\?/i
    ) as HTMLInputElement;
    userEvent.type(input, fakeItem.name);
    fireEvent.submit(getByRole("form"));

    expect(add).toBeCalledWith(uid, fakeItem.name);
    expect(add).toBeCalledTimes(1);

    await wait(() => {
        getAllByText(fakeItem.name);
    });

    // should update item
    (update as jest.Mock).mockResolvedValueOnce(null);
    const link = container.querySelector(`[href="/edit/${fakeItem.id}"]`);
    if (link === null) {
        throw new Error(`unable to find the link "/edit/${fakeItem.id}"`);
    }
    userEvent.click(link);
    await wait(() => {
        getByDisplayValue(fakeItem.name);
        userEvent.type(getByDisplayValue(fakeItem.name), fakeItem2.name);
    });
    fireEvent.submit(getByTestId("form"));
    await wait(() => {
        getAllByText(fakeItem2.name);
    });
    expect(update).toBeCalledWith(fakeItem.id, fakeItem2.name);
    expect(update).toBeCalledTimes(1);
});
