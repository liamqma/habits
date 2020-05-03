import React from "react";
import { render } from "@testing-library/react";
import Summary from "./index";

test("return null if no item", () => {
    const { container } = render(<Summary items={[]} />);
    expect(container.childElementCount).toBe(0);
});
