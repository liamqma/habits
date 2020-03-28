import React from "react";
import { render } from "@testing-library/react";
import Add from "./index";

jest;

test("renders Name", () => {
    const { getByText } = render(<Add add={jest.fn()} />);
    const linkElement = getByText(/Name/i);
    expect(linkElement).toBeInTheDocument();
});
