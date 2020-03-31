import isToday from "./isToday";

test("yesterday is not today", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    expect(isToday(yesterday)).toBeFalsy();
});

test("today is today", () => {
    const today = new Date();
    expect(isToday(today)).toBeTruthy();
});
