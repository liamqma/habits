import { add as addItem, remove as removeItem } from "./item";
import { buildItem } from "../../test/utils/generate";

describe("test addItem", () => {
    test("returns same items if itemName is not defined", () => {
        const items = [buildItem(), buildItem()];
        expect(addItem(items, "")).toEqual(items);
    });

    test("add new item", () => {
        const items = [buildItem(), buildItem()];
        expect(addItem(items, "eat breakfast").length).toBe(3);
    });
});

describe("test removeItem", () => {
    test("remove item by id", () => {
        const items = [buildItem(), buildItem()];
        expect(removeItem(items, items[0].id).length).toBe(1);
    });
});
