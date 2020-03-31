import faker from "faker";
import { Item } from "../../src/types";

const getItemName = (): string => `${faker.hacker.verb} ${faker.hacker.noun}`;
const getId = faker.random.uuid;

export function buildItem(overrides?: object): Item {
    return {
        id: getId(),
        name: getItemName(),
        doneDates: [],
        ...overrides,
    };
}
