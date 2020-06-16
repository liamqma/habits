import React from "react";
import ModuleCalendar from "react-github-contribution-calendar";
import { Item } from "../../types";

const defaultCalendarProps = {
    weekNames: ["", "M", "", "W", "", "F", ""],
    monthNames: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    panelColors: ["#EEE", "#cc9a9a"],
    dateFormat: "YYYY-M-D",
};

interface Props {
    item: Item;
}

export interface CalendarValues {
    [date: string]: number;
}

export function formateDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export default function Calendar({ item }: Props): JSX.Element {
    const calendarValues: CalendarValues = {};
    item.doneDates.forEach((doneDate) => {
        const formatedDoneDate = formateDate(doneDate);
        calendarValues[formatedDoneDate] = 1;
    });
    return (
        <ModuleCalendar
            {...defaultCalendarProps}
            values={calendarValues}
            until={formateDate(new Date())}
        />
    );
}
