import React from "react";
import { render, wait, fireEvent, RenderResult } from "@testing-library/react";
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
import { Item } from "../../types";

const mockedUser = {
    uid: "User A",
};

jest.mock("../../repository/firestore");

jest.mock("../../hooks/use-auth");

jest.mock("../Loading/index");

jest.mock("../Summary/index");

beforeAll(() => {
    (window.confirm as jest.Mock).mockReturnValueOnce(true);
});

afterEach(() => {
    (getAll as jest.Mock).mockReset();
});

afterAll(() => {
    (window.confirm as jest.Mock).mockReset();
    (window.alert as jest.Mock).mockReset();
});

interface CustomRenderResult extends RenderResult {
    item: Item;
}

function renderApp(options?: { item?: Item }): CustomRenderResult {
    const item = options?.item || buildItem();
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockResolvedValueOnce([item]);
    (removeDoneDate as jest.Mock).mockResolvedValueOnce(null);
    (addDoneDate as jest.Mock).mockResolvedValueOnce(null);
    (remove as jest.Mock).mockResolvedValueOnce(null);
    (update as jest.Mock).mockResolvedValueOnce(null);

    const utils = render(<App />);
    return {
        ...utils,
        item,
    };
}

test("show error banner if getAll fails", async () => {
    const fakeError = new Error("fake error");
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
    (getAll as jest.Mock).mockRejectedValueOnce(new Error("fake error"));

    render(<App />);

    await wait();

    expect(window.alert).toBeCalledWith(fakeError.message);
    expect(window.alert).toBeCalledTimes(1);
});

test("clicking on item should remove done date if today is done", async () => {
    const { getAllByText, getByTestId, item } = renderApp({
        item: buildItem({ doneDates: [new Date()] }),
    });

    await wait();

    expect(getByTestId(`${item.id}-dates`).textContent).toBe("1");

    userEvent.click(getAllByText(item.name)[0]);

    expect(removeDoneDate).toBeCalledWith(item.id, item.doneDates[0]);
    expect(removeDoneDate).toBeCalledTimes(1);

    await wait();

    expect(getByTestId(`${item.id}-dates`).textContent).toBe("0");
});

test("clicking on item should add done date if today is not done", async () => {
    const { getAllByText, getByText, item } = renderApp();

    await wait();

    userEvent.click(getAllByText(item.name)[0]);

    expect(addDoneDate).toBeCalledWith(item.id);
    expect(addDoneDate).toBeCalledTimes(1);

    await wait(() => {
        getByText("1");
    });
});

test("delete item", async () => {
    const {
        getByDisplayValue,
        queryByText,
        container,
        getByTestId,
        item,
    } = renderApp();

    await wait();

    const link = container.querySelector(`[href="/edit/${item.id}"]`);
    if (link === null) {
        throw new Error(`unable to find the link "/edit/${item.id}"`);
    }
    userEvent.click(link);

    await wait(() => {
        getByDisplayValue(item.name);
    });

    userEvent.click(getByTestId("remove"));
    expect(remove).toBeCalledWith(item.id);
    expect(remove).toBeCalledTimes(1);

    await wait();
    expect(queryByText(item.name)).not.toBeInTheDocument();
});

test("update item", async () => {
    const fakeItem = buildItem();

    const {
        getAllByText,
        getByDisplayValue,
        container,
        getByTestId,
        item,
    } = renderApp();

    await wait();

    const link = container.querySelector(`[href="/edit/${item.id}"]`);
    if (link === null) {
        throw new Error(`unable to find the link "/edit/${item.id}"`);
    }
    userEvent.click(link);
    await wait(() => {
        getByDisplayValue(item.name);
        userEvent.type(getByDisplayValue(item.name), fakeItem.name);
    });
    fireEvent.submit(getByTestId("form"));
    await wait(() => {
        getAllByText(fakeItem.name);
    });
    expect(update).toBeCalledWith(item.id, fakeItem.name);
    expect(update).toBeCalledTimes(1);
});

test("add item", async () => {
    const fakeItem = buildItem();

    const { getAllByText, getByPlaceholderText, getByRole } = renderApp();

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

    (useAuth as jest.Mock).mockReturnValueOnce({
        user: null,
    });

    const { getByText, rerender, getAllByText } = render(<App />);

    // should show sign in page
    getByText(/sign in with/i);

    (useAuth as jest.Mock).mockReturnValueOnce({
        user: mockedUser,
    });

    (getAll as jest.Mock).mockResolvedValueOnce(fakeItems);

    rerender(<App />);

    await wait(() => {
        // should renders list
        getAllByText(fakeItems[0].name);
    });

    getAllByText(fakeItems[1].name);
    expect(getAll).toBeCalledWith(mockedUser.uid);
    expect(getAll).toBeCalledTimes(1);
});
