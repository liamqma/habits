import React from "react";
import { render } from "@testing-library/react";
import Calendar, { CalendarValues, formateDate } from "./Calendar";
import ModuleCalendar from "react-github-contribution-calendar";
import { buildItem } from "../../../test/utils/generate";

jest.mock("react-github-contribution-calendar");

test("react-github-contribution-calendar should render with correct props", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const item = buildItem({ doneDates: [yesterday, today] });

    const calendarValues: CalendarValues = {};
    calendarValues[formateDate(today)] = 1;
    calendarValues[formateDate(yesterday)] = 1;

    render(<Calendar item={item} />);

    expect(ModuleCalendar).toBeCalledWith(
        expect.objectContaining({
            values: calendarValues,
        }),
        expect.anything()
    );
});
