import faker from "faker";
import { Item, Status } from "../../src/types";

const getItemName = (): string =>
    `${faker.hacker.verb()} ${faker.hacker.noun()}`;
const getId = faker.random.uuid;

export interface Overrides {
    id?: string;
    name?: string;
    doneDates?: Date[];
}

export function buildItem(overrides?: Overrides): Item {
    return {
        id: getId(),
        name: getItemName(),
        doneDates: [],
        status: Status.active,
        ...overrides,
    };
}

export function buildItems(numberOfItems: number): Array<Item> {
    const items = [];
    for (let i = 0; i < numberOfItems; i++) {
        items.push(buildItem());
    }
    return items;
}
