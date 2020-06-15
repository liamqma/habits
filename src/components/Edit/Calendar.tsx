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

export default function Calendar({ item }: Props): JSX.Element {
    const calendarValues: { [date: string]: number } = {};
    item.doneDates.forEach((doneDate) => {
        const formatedDoneDate = `${doneDate.getFullYear()}-${doneDate.getMonth()}-${doneDate.getDate()}`;
        calendarValues[formatedDoneDate] = 1;
    });
    const now = new Date();
    const until = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return (
        <ModuleCalendar
            {...defaultCalendarProps}
            values={calendarValues}
            until={until}
        />
    );
}
