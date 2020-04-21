import { update, remove, removeDoneDate } from "./inMemory";
import { buildItem } from "../../test/utils/generate";

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

describe("test undone", () => {
    test("should remove doneDate", () => {
        const item = buildItem({ doneDates: [new Date()] });
        expect(removeDoneDate([item], item.id)[0].doneDates.length).toEqual(0);
    });
});
