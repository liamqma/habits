import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import Calendar from "react-github-contribution-calendar";
import swal from "sweetalert";
import { Input, SubmitButton } from "../Add/index";
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

const Form = styled.form`
    position: relative;
`;

const NotFoundWrapper = styled.div`
    padding: 15px 15px 15px 50px;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
`;

const RemoveButton = styled.button`
    font-size: 30px;
    margin: 10px auto 0;
    display: block;
`;

interface Props {
    edit: Function;
    remove: Function;
    items: Array<Item>;
}

function Edit({ edit, remove, items }: Props): JSX.Element {
    const { id } = useParams();
    const item = items.find((item) => item.id === id);
    const [name, setName] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (item) {
            setName(item.name);
        }
    }, [item]);

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
        if (item && name && item.name !== name) {
            edit(item.id, name);
            swal({ title: "The name has been updated.", icon: "info" });
            history.push("/");
        }
        event.preventDefault();
    };

    function confirmRemove(): void {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this habit!",
            icon: "warning",
            dangerMode: true,
        }).then((confirmDelete) => {
            if (confirmDelete) {
                remove(id);
                history.push("/");
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    if (!item)
        return (
            <NotFoundWrapper>
                Habit is not found.{" "}
                <span role="img" aria-label="shrug">
                    🤷‍♀️
                </span>
            </NotFoundWrapper>
        );
    const calendarValues: { [date: string]: number } = {};
    item.doneDates.forEach((doneDate) => {
        const formatedDoneDate = `${doneDate.getFullYear()}-${doneDate.getMonth()}-${doneDate.getDate()}`;
        calendarValues[formatedDoneDate] = 1;
    });
    const now = new Date();
    const until = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    return (
        <>
            <Form onSubmit={handleSubmit} data-testid="form">
                <Input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    autoFocus
                    aria-label="Habbit name"
                />
                {name && <SubmitButton type="submit" value="Update" />}
            </Form>
            <RemoveButton onClick={confirmRemove} data-testid="remove">
                <MdDeleteForever />
            </RemoveButton>
            <Calendar
                {...defaultCalendarProps}
                values={calendarValues}
                until={until}
            />
        </>
    );
}

export default Edit;
