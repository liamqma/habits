import React, { useState } from "react";
import styled from "styled-components";

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
        <form onSubmit={handleSubmit} data-testid="form">
            <Input
                placeholder="What habit to develop?"
                type="text"
                value={name}
                onChange={handleChange}
                autoFocus
                aria-label="New habbit"
            />
        </form>
    );
}

export default Add;