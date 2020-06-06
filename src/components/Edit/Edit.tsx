import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import window from "global/window";
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

const RemoveButton = styled.button`
    font-size: 30px;
    margin: 10px auto;
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
            swal("The name has been updated.");
            history.push("/");
        }
        event.preventDefault();
    };

    function confirmRemove(): void {
        if (window.confirm("Do you really want to delete permanently?")) {
            remove(id);
            history.push("/");
        }
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
            <RemoveButton onClick={confirmRemove} data-testid="remove">
                <MdDeleteForever />
            </RemoveButton>
        </>
    );
}

export default Edit;
