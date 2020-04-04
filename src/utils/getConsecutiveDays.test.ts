import getConsecutiveDays from "./getConsecutiveDays";

test("should return 0 if no doneDates", () => {
    expect(getConsecutiveDays([])).toBe(0);
});

test("should return 1 if only one doneDate", () => {
    expect(getConsecutiveDays([new Date()])).toBe(1);
});

test("get consecutive days if input dates are consecutive", () => {
    const today = new Date();
    const todayMinusOne = new Date();
    const todayMinusTwo = new Date();
    const todayMinusThree = new Date();
    todayMinusOne.setDate(today.getDate() - 1);
    todayMinusTwo.setDate(today.getDate() - 2);
    todayMinusThree.setDate(today.getDate() - 3);
    const doneDates = [todayMinusThree, todayMinusTwo, todayMinusOne, today];

    expect(getConsecutiveDays(doneDates)).toBe(4);
});

test("get consecutive days correctly if there is a break", () => {
    const today = new Date();
    const todayMinusOne = new Date();
    const todayMinusThree = new Date();
    todayMinusOne.setDate(today.getDate() - 1);
    todayMinusThree.setDate(today.getDate() - 3);
    const doneDates = [todayMinusThree, todayMinusOne, today];

    expect(getConsecutiveDays(doneDates)).toBe(2);
});

test("get consecutive days correctly if consecutive two days", () => {
    const today = new Date();
    const todayMinusOne = new Date();
    todayMinusOne.setDate(today.getDate() - 1);
    const doneDates = [todayMinusOne, today];

    expect(getConsecutiveDays(doneDates)).toBe(2);
});

test("get consecutive days correctly if two days and a break", () => {
    const today = new Date();
    const todayMinusTwo = new Date();
    todayMinusTwo.setDate(today.getDate() - 2);
    const doneDates = [todayMinusTwo, today];

    expect(getConsecutiveDays(doneDates)).toBe(1);
});
