import { isDoneToday, isToday, isTodayAllDone } from "./today";
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

test("returns returns true is doneDones has today", () => {
    const today = new Date();
    const item = buildItem({ doneDates: [today] });
    expect(isDoneToday(item)).toBeTruthy();
});

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

test("isTodayAllDone returns true if all done", () => {
    const items = [
        buildItem({
            doneDates: [new Date()],
        }),
        buildItem({
            doneDates: [new Date()],
        }),
    ];
    expect(isTodayAllDone(items)).toBeTruthy();
});

test("isTodayAllDone returns false if there is a undone item", () => {
    const items = [
        buildItem(),
        buildItem({
            doneDates: [new Date()],
        }),
    ];
    expect(isTodayAllDone(items)).toBeFalsy();
});
