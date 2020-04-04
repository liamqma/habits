import faker from "faker";
import { Item } from "../../src/types";

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
        ...overrides,
    };
}
