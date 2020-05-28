import React from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    getAll,
    add,
    update,
    remove,
    addDoneDate,
    removeDoneDate,
} from "../../repository/firestore";
import window from "global/window";
import useAuth from "../../hooks/use-auth";
import App from "./App";
import { buildItem } from "../../../test/utils/generate";

const mockedUser = {
    uid: "User A",
};

jest.mock("../../repository/firestore");

jest.mock("../../hooks/use-auth");

jest.mock("../Loading/index");

beforeAll(() => {
    (window.confirm as jest.Mock).mockReturnValueOnce(true);
});

beforeEach(() => {
    (getAll as jest.Mock).mockReset();
});

afterAll(() => {
    (window.confirm as jest.Mock).mockReset();
});

test("clicking on item should remove done date if today is done", async () => {
    const fakeItem = buildItem({ doneDates: [new Date()] });
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve([fakeItem]));
    (removeDoneDate as jest.Mock).mockReturnValueOnce(Promise.resolve(null));

    const { getAllByText, getByText } = render(<App />);

    await wait(() => {
        getByText("1");
    });

    userEvent.click(getAllByText(fakeItem.name)[0]);

    expect(removeDoneDate).toBeCalledWith(fakeItem.id, fakeItem.doneDates[0]);
    expect(removeDoneDate).toBeCalledTimes(1);

    await wait(() => {
        getByText("0");
    });
});

test("clicking on item should add done date if today is not done", async () => {
    const fakeItem = buildItem();
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve([fakeItem]));
    (addDoneDate as jest.Mock).mockReturnValueOnce(Promise.resolve(null));

    const { getAllByText, getByText } = render(<App />);

    await wait();

    userEvent.click(getAllByText(fakeItem.name)[0]);

    expect(addDoneDate).toBeCalledWith(fakeItem.id);
    expect(addDoneDate).toBeCalledTimes(1);

    await wait(() => {
        getByText("1");
    });
});

test("delete item", async () => {
    const fakeItem = buildItem();
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve([fakeItem]));
    (remove as jest.Mock).mockReturnValueOnce(Promise.resolve(null));

    const { getByDisplayValue, queryByText, container, getByTestId } = render(
        <App />
    );

    await wait();

    const link = container.querySelector(`[href="/edit/${fakeItem.id}"]`);
    if (link === null) {
        throw new Error(`unable to find the link "/edit/${fakeItem.id}"`);
    }
    userEvent.click(link);

    await wait(() => {
        getByDisplayValue(fakeItem.name);
    });

    userEvent.click(getByTestId("remove"));
    expect(remove).toBeCalledWith(fakeItem.id);
    expect(remove).toBeCalledTimes(1);

    await wait();
    expect(queryByText(fakeItem.name)).not.toBeInTheDocument();
});

test("update item", async () => {
    const fakeItem = buildItem();
    const fakeItem2 = buildItem();
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve([fakeItem]));
    (update as jest.Mock).mockResolvedValueOnce(null);

    const { getAllByText, getByDisplayValue, container, getByTestId } = render(
        <App />
    );

    await wait();

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

test("add item", async () => {
    const fakeItem = buildItem();
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve([]));

    const { getAllByText, getByPlaceholderText, getByRole } = render(<App />);

    (add as jest.Mock).mockResolvedValueOnce(fakeItem);
    const input = getByPlaceholderText(
        /what habit to develop\?/i
    ) as HTMLInputElement;
    userEvent.type(input, fakeItem.name);
    fireEvent.submit(getByRole("form"));

    expect(add).toBeCalledWith(mockedUser.uid, fakeItem.name);
    expect(add).toBeCalledTimes(1);

    await wait(() => {
        getAllByText(fakeItem.name);
    });
});

test("login and render list, add item, update item", async () => {
    const fakeItems = [buildItem(), buildItem()];

    (useAuth as jest.Mock).mockReturnValue({
        user: null,
    });

    const { getByText, rerender, getAllByText } = render(<App />);

    // should show sign in page
    getByText(/sign in with/i);

    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });

    (getAll as jest.Mock).mockReturnValueOnce(Promise.resolve(fakeItems));

    rerender(<App />);

    await wait(() => {
        // should renders list
        getAllByText(fakeItems[0].name);
    });

    getAllByText(fakeItems[1].name);
    expect(getAll).toBeCalledWith(mockedUser.uid);
    expect(getAll).toBeCalledTimes(1);
});
