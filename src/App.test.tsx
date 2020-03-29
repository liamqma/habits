import React from "react";
// import Cookie from "js-cookie";
import { render } from "@testing-library/react";
import App from "./App";

// jest.mock("js-cookie");

test("renders Items from Cookie", () => {
    // (Cookie.get as jest.Mock).mockReturnValueOnce(
    //     '[{"id":"12345","name":"Read a book","doneDates":[]}]'
    // );
    // console.log(App);
    const { debug } = render(<App />);
    console.log(debug);

    // const elment = getByText(/Read a book/i);
    // expect(elment).toBeInTheDocument();
});
