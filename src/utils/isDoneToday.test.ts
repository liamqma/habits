import isDoneToday from "./isDoneToday";
import { buildItem } from "../../test/utils/generate";

test("returns false if doneDates is empty", () => {
    const item = buildItem();
    expect(isDoneToday(item)).toBeFalsy();
});

test("returns false if doneDones doesn't have today", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const item = buildItem({ doneDates: [yesterday] });
    expect(isDoneToday(item)).toBeFalsy();
});

test("returns erturn true is doneDones has today", () => {
    const today = new Date();
    const item = buildItem({ doneDates: [today] });
    expect(isDoneToday(item)).toBeTruthy();
});
