import createId from "./createId";

test("get a string", () => {
    expect(typeof createId()).toBe("string");
});
