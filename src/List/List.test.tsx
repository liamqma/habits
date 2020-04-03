import React from "react";
import { render, fireEvent } from "@testing-library/react";
import List from "./index";
import { buildItem } from "../../test/utils/generate";
import isDoneToday from "../utils/isDoneToday";

const remove = jest.fn();
const done = jest.fn();
const unDone = jest.fn();
jest.mock("../utils/isDoneToday");

test("return null if no item", () => {
    const { container } = render(
        <List items={[]} remove={remove} done={done} unDone={unDone} />
    );
    expect(container.childElementCount).toBe(0);
});

test("render list", () => {
    const item = buildItem();
    const { getAllByText } = render(
        <List items={[item]} remove={remove} done={done} unDone={unDone} />
    );
    expect(getAllByText(item.name).length).toBe(1);
});

test("call done() if click on done button", () => {
    const item = buildItem();
    (isDoneToday as jest.Mock).mockReturnValueOnce(false);
    const { getByText } = render(
        <List items={[item]} remove={remove} done={done} unDone={unDone} />
    );
    fireEvent.click(getByText(item.name));
    expect(done).toBeCalledWith(item.id);
    expect(done).toBeCalledTimes(1);
});

test("call unDone() if click on unDone button", () => {
    const item = buildItem();
    (isDoneToday as jest.Mock).mockReturnValueOnce(true);
    const { getByText } = render(
        <List items={[item]} remove={remove} done={done} unDone={unDone} />
    );
    fireEvent.click(getByText(item.name));
    expect(unDone).toBeCalledWith(item.id);
    expect(unDone).toBeCalledTimes(1);
});
