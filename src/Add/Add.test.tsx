import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Add from "./index";
import { buildItem } from "../../test/utils/generate";

const add = jest.fn();

test("should change Input value during typing", () => {
    const item = buildItem();

    const { getByPlaceholderText } = render(<Add add={add} />);

    const input = getByPlaceholderText(
        /What habit to develop\?/i
    ) as HTMLInputElement;

    userEvent.type(input, item.name);

    expect(input.value).toEqual(item.name);
});

test("should call add() when submtting", () => {
    const item = buildItem();

    const { getByPlaceholderText, getByTestId } = render(<Add add={add} />);

    const input = getByPlaceholderText(
        /What habit to develop\?/i
    ) as HTMLInputElement;

    userEvent.type(input, item.name);
    fireEvent.submit(getByTestId("form"));

    expect(add).toBeCalledWith(item.name);
});

test("should clear Input value when submtting", () => {
    const { getByPlaceholderText, getByTestId } = render(<Add add={add} />);

    const input = getByPlaceholderText(
        /What habit to develop\?/i
    ) as HTMLInputElement;

    userEvent.type(input, "xxx");
    fireEvent.submit(getByTestId("form"));

    expect(input.value).toEqual("");
});
