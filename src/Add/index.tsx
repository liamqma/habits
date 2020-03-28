import React, { useState } from "react";

interface Props {
    add: Function;
}

function Add({ add }: Props): JSX.Element {
    const [name, setName] = useState("");

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
        add(name);
        event.preventDefault();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={handleChange} />
            </label>
            <input type="submit" value="Add" />
        </form>
    );
}

export default Add;
