import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import Calendar from "./Calendar";
import swal from "sweetalert";
import { Input, SubmitButton } from "../Add/index";
import { Item } from "../../types";

const Form = styled.form`
    position: relative;
`;

const NotFoundWrapper = styled.div`
    padding: 15px 15px 15px 50px;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
`;

const Button = styled.button`
    color: #fff;
    padding: 15px 15px 15px 35px;
    border-radius: 5px;
    font-weight: 600;
    position: relative;
    display: block;
    margin: 10px auto;
    min-width: 115px;

    svg {
        position: absolute;
        top: 17px;
        left: 15px;
    }
`;

const RemoveButton = styled(Button)`
    background-color: #dc3545;
`;

const CompleteButton = styled(Button)`
    background-color: #cc9a9a;
`;

interface Props {
    edit: Function;
    remove: Function;
    complete: Function;
    items: Array<Item>;
}

function Edit({ edit, remove, complete, items }: Props): JSX.Element {
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
            buttons: ["Cancel", "I am sure!"],
            dangerMode: true,
        }).then((confirmDelete) => {
            if (confirmDelete) {
                remove(id);
                history.push("/");
            }
        });
    }

    function confirmComplete(): void {
        swal({
            title: "Do you want to complete this habit?",
            icon: "info",
            buttons: ["Cancel", "Yes, please!"],
        }).then((confirmComplete) => {
            if (confirmComplete) {
                complete(id);
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
            <CompleteButton onClick={confirmComplete} data-testid="complete">
                <FaThumbsUp /> Complete
            </CompleteButton>
            <RemoveButton onClick={confirmRemove} data-testid="remove">
                <FaTrash /> Delete
            </RemoveButton>
            <Calendar item={item} />
        </>
    );
}

export default Edit;
