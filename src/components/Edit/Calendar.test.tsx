import React from "react";
import Calendar from "./Calendar";
import { buildItem } from "../../../test/utils/generate";

test("dummy", () => {
    const item = buildItem();
    <Calendar item={item} />;
    expect(true).toBe(true);
});

test.todo(
    "react-github-contribution-calendar should render with correct props"
);
