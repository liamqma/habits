import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Add from "./index";
import { buildItem } from "../../test/utils/generate";

test("change Input value, submit the form, then clear the Input value", () => {
    const add = jest.fn();
    const item = buildItem();

    const { getByPlaceholderText, getByRole, queryByDisplayValue } = render(
        <Add add={add} />
    );

    const input = getByPlaceholderText(
        /what habit to develop\?/i
    ) as HTMLInputElement;

    // Submit button should be hidden
    expect(queryByDisplayValue("Add")).not.toBeInTheDocument();

    userEvent.type(input, item.name);
    expect(input.value).toEqual(item.name);

    // Submit button should be visible
    expect(queryByDisplayValue("Add")).toBeInTheDocument();

    fireEvent.submit(getByRole("form"));
    expect(add).toBeCalledWith(item.name);

    expect(input.value).toEqual("");
});
