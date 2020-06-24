import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import swal from "sweetalert";
import userEvent from "@testing-library/user-event";
import Edit from "./index";
import { buildItem } from "../../../test/utils/generate";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
    const originalModule = jest.requireActual("react-router-dom");

    return {
        __esModule: true,
        ...originalModule,
        useParams: (): object => ({
            id: "foo",
        }),
        useHistory: (): object => ({
            push: mockHistoryPush,
        }),
    };
});

afterEach(() => {
    (swal as jest.Mock).mockReset();
});

test("should render 404 if habit is not found", () => {
    const { getByText } = render(
        <Edit
            items={[]}
            edit={jest.fn}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );
    getByText("Habit is not found.");
});

test("should render name when name is available", () => {
    const item = buildItem({ id: "foo" });

    const { getByDisplayValue, rerender } = render(
        <Edit
            items={[]}
            edit={jest.fn}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );

    rerender(
        <Edit
            items={[item]}
            complete={jest.fn}
            incomplete={jest.fn}
            edit={jest.fn}
            remove={jest.fn}
        />
    );

    getByDisplayValue(item.name);
});

test("should call edit() upon submitting", () => {
    const edit = jest.fn();
    const item = buildItem({ id: "foo" });

    const { getByTestId, getByDisplayValue } = render(
        <Edit
            items={[item]}
            edit={edit}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );

    const input = getByDisplayValue(item.name) as HTMLInputElement;

    userEvent.type(input, "Watch movie");

    fireEvent.submit(getByTestId("form"));
    expect(edit).toBeCalledWith(item.id, "Watch movie");
    expect(edit).toBeCalledTimes(1);
    expect(swal).toBeCalledTimes(1);
});

test("should not call edit() if name doesn't change", () => {
    const edit = jest.fn();
    const item = buildItem({ id: "foo" });

    const { getByTestId } = render(
        <Edit
            items={[item]}
            edit={edit}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );

    fireEvent.submit(getByTestId("form"));
    expect(edit).not.toBeCalled();
    expect(swal).not.toBeCalled();
});

test("should change Input value during typing", () => {
    const item = buildItem({ id: "foo" });

    const { getByDisplayValue } = render(
        <Edit
            items={[item]}
            edit={jest.fn}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );

    const input = getByDisplayValue(item.name) as HTMLInputElement;

    userEvent.type(input, "Watch movie");

    expect(input.value).toEqual("Watch movie");
});

test("should remove if clicking upon remove button and confirm", async () => {
    const remove = jest.fn();
    const item = buildItem({ id: "foo" });
    (swal as jest.Mock).mockResolvedValueOnce(true);

    const { getByTestId } = render(
        <Edit
            items={[item]}
            edit={jest.fn}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={remove}
        />
    );

    const button = getByTestId("remove");
    fireEvent.click(button);

    await wait();

    expect(remove).toBeCalledWith(item.id);
    expect(remove).toBeCalledTimes(1);
});

test("should redirect to homepage after remove", () => {
    const item = buildItem({ id: "foo" });

    (swal as jest.Mock).mockResolvedValueOnce(true);

    const { getByTestId } = render(
        <Edit
            items={[item]}
            edit={jest.fn}
            complete={jest.fn}
            incomplete={jest.fn}
            remove={jest.fn}
        />
    );

    const button = getByTestId("remove");
    fireEvent.click(button);

    expect(mockHistoryPush).toBeCalledWith("/");
});
