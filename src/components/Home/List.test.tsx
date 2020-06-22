import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import List from "./List";
import { buildItem } from "../../../test/utils/generate";
import { isDoneToday } from "../../utils/today";

const done = jest.fn();
const unDone = jest.fn();
jest.mock("../../utils/today");

test("return null if no item", () => {
    const { container } = render(
        <Router>
            <List items={[]} done={done} unDone={unDone} />
        </Router>
    );
    expect(container.childElementCount).toBe(0);
});

test("render list", () => {
    const item = buildItem();
    const { getAllByText } = render(
        <Router>
            <List items={[item]} done={done} unDone={unDone} />
        </Router>
    );
    expect(getAllByText(item.name).length).toBe(1);
});

test("call done() if click on done button", () => {
    const item = buildItem();
    (isDoneToday as jest.Mock).mockReturnValueOnce(false);
    const { getByText } = render(
        <Router>
            <List items={[item]} done={done} unDone={unDone} />
        </Router>
    );
    fireEvent.click(getByText(item.name));
    expect(done).toBeCalledWith(item.id);
    expect(done).toBeCalledTimes(1);
});

test("call unDone() if click on unDone button", () => {
    const item = buildItem();
    (isDoneToday as jest.Mock).mockReturnValueOnce(true);
    const { getByText } = render(
        <Router>
            <List items={[item]} done={done} unDone={unDone} />
        </Router>
    );
    fireEvent.click(getByText(item.name));
    expect(unDone).toBeCalledWith(item.id);
    expect(unDone).toBeCalledTimes(1);
});
