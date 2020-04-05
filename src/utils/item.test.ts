import { add, update, remove, done, unDone } from "./item";
import { buildItem } from "../../test/utils/generate";

describe("test addItem", () => {
    test("returns same items if itemName is not defined", () => {
        const items = [buildItem(), buildItem()];
        expect(add(items, "")).toEqual(items);
    });

    test("add new item", () => {
        const items = [buildItem(), buildItem()];
        expect(add(items, "eat breakfast").length).toBe(3);
    });
});

describe("test updateItem", () => {
    test("should update item", () => {
        const items = [buildItem(), buildItem()];
        expect(update(items, items[0].id, "Watch movie")[0].name).toBe(
            "Watch movie"
        );
    });

    test("should do nothing if id is not found", () => {
        const items = [buildItem(), buildItem()];
        expect(update(items, "foo-bar", "Watch movie")).toEqual(items);
    });
});

describe("test removeItem", () => {
    test("remove item by id", () => {
        const items = [buildItem(), buildItem()];
        expect(remove(items, items[0].id).length).toBe(1);
    });
});

describe("test done", () => {
    test("does nothing if id doesn't exist", () => {
        const items = [buildItem()];
        expect(done(items, "foo")).toEqual(items);
    });

    test("add today to doneToday if today is not done", () => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const item = buildItem({ doneDates: [yesterday] });
        expect(done([item], item.id)[0].doneDates.length).toEqual(2);
    });

    test("does nothing if today is done already", () => {
        const item = buildItem({ doneDates: [new Date()] });
        expect(done([item], item.id)[0].doneDates.length).toEqual(1);
    });
});

describe("test undone", () => {
    test("does nothing if today is not done", () => {
        const item = buildItem();
        expect(unDone([item], item.id)[0].doneDates.length).toEqual(0);
    });

    test("should remove doneDate", () => {
        const item = buildItem({ doneDates: [new Date()] });
        expect(unDone([item], item.id)[0].doneDates.length).toEqual(0);
    });
});
