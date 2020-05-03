import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    position: relative;
`;

export const Input = styled.input`
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    color: inherit;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 15px 15px 15px 50px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

    ::placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }
`;

export const SubmitButton = styled.input`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 18px;
    margin: auto 0;

    &:hover {
        cursor: pointer;
    }
`;

interface Props {
    add: Function;
}

function Add({ add }: Props): JSX.Element {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
        setName("");
        add(name);
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    return (
        <Form onSubmit={handleSubmit} role="form">
            <Input
                placeholder="What habit to develop?"
                type="text"
                value={name}
                onChange={handleChange}
                autoFocus
                aria-label="New habbit"
            />
            {name && <SubmitButton type="submit" value="Add" />}
        </Form>
    );
}

export default Add;
