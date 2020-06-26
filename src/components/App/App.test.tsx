import React from "react";
import { render, wait, fireEvent, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    getAll,
    add,
    update,
    remove,
    complete,
    incomplete,
    addDoneDate,
    removeDoneDate,
} from "../../repository/firestore";
import swal from "sweetalert";
import useAuth from "../../hooks/use-auth";
import App from "./App";
import { buildItem } from "../../../test/utils/generate";
import { Item, Status } from "../../types";

const mockedUser = {
    uid: "User A",
};

jest.mock("../../repository/firestore");

jest.mock("../../hooks/use-auth");

jest.mock("../Loading/Loading");

jest.mock("../Home/Summary");

beforeAll(() => {
    (useAuth as jest.Mock).mockReturnValue({
        user: mockedUser,
    });
});

afterAll(() => {
    (useAuth as jest.Mock).mockRestore();
});

afterEach(() => {
    (getAll as jest.Mock).mockReset();
    (swal as jest.Mock).mockReset();
});

interface CustomRenderResult extends RenderResult {
    item: Item;
    items: Array<Item>;
}

function renderApp(options?: {
    item?: Item;
    items?: Array<Item>;
}): CustomRenderResult {
    let items = [];
    if (options?.items && options?.items.length) {
        items = options.items || [];
    } else {
        items = [options?.item || buildItem()];
    }

    (getAll as jest.Mock).mockResolvedValueOnce([...items]);
    (removeDoneDate as jest.Mock).mockResolvedValueOnce(null);
    (addDoneDate as jest.Mock).mockResolvedValueOnce(null);
    (remove as jest.Mock).mockResolvedValueOnce(null);
    (complete as jest.Mock).mockResolvedValueOnce(null);
    (incomplete as jest.Mock).mockResolvedValueOnce(null);
    (update as jest.Mock).mockResolvedValueOnce(null);

    const utils = render(<App />);
    return {
        ...utils,
        item: items[0],
        items,
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

    expect(swal).toBeCalledWith(expect.any(String), fakeError.message, "error");
    expect(swal).toBeCalledTimes(1);
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
    const { getAllByText, getByTestId, items } = renderApp({
        items: [buildItem(), buildItem({ status: Status.complete })],
    });

    await wait();

    userEvent.click(getAllByText(items[0].name)[0]);

    expect(addDoneDate).toBeCalledWith(items[0].id);
    expect(addDoneDate).toBeCalledTimes(1);

    await wait();
    expect(getByTestId(`${items[0].id}-dates`).textContent).toBe("1");

    // Expect the congrats message
    expect(swal).toBeCalledWith(
        expect.objectContaining({ title: expect.any(String), icon: "success" })
    );
    expect(swal).toBeCalledTimes(1);
});

test("incomplete item", async () => {
    (swal as jest.Mock).mockResolvedValueOnce(true);

    const {
        container,
        getByTestId,
        getAllByText,
        getByText,
        item,
    } = renderApp({ item: buildItem({ status: Status.complete }) });

    await wait();

    const completeLink = container.querySelector(`[href="/complete"]`);
    if (completeLink === null) {
        throw new Error(`unable to find the link "/complete"`);
    }
    userEvent.click(completeLink);

    await wait(() => {
        getByText(item.name);
    });

    const itemLink = container.querySelector(`[href="/edit/${item.id}"]`);
    if (itemLink === null) {
        throw new Error(`unable to find the link "/edit/${item.id}"`);
    }
    userEvent.click(itemLink);

    await wait();

    userEvent.click(getByTestId("incomplete"));

    await wait();

    expect(swal).toBeCalledTimes(1);
    expect(incomplete).toBeCalledWith(item.id);
    expect(incomplete).toBeCalledTimes(1);

    await wait();
    getAllByText(item.name);
});

test("complete item", async () => {
    (swal as jest.Mock).mockResolvedValueOnce(true);

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

    userEvent.click(getByTestId("complete"));

    await wait();

    expect(swal).toBeCalledTimes(1);
    expect(complete).toBeCalledWith(item.id);
    expect(complete).toBeCalledTimes(1);

    await wait();
    expect(queryByText(item.name)).not.toBeInTheDocument();
});

test("delete item", async () => {
    (swal as jest.Mock).mockResolvedValueOnce(true);

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

    await wait();

    expect(swal).toBeCalledTimes(1);
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
    getByText(/click here/i);

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
