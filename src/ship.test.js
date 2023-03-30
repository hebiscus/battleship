/* eslint-disable no-undef */
import { shipFactory } from "./ship";

describe("creating a ship", () => {
    const badShip = shipFactory("2","2");
    const weirdShip = shipFactory(3,4);
    const goodShip = shipFactory(6,4);

    it("returns error when made with wrong properties", () => {
        expect(badShip).toEqual("invalid values");
    });

    it("returns error when number of hits is bigger than length", () => {
        expect(weirdShip).toEqual("invalid values");
    });

    it("returns proper properties when they're of accurate type", () => {
        expect(goodShip.hits).toBe(4);
    });
});


it("deletes -1 of current length", () => {
    const newShip = shipFactory(5, 0);
    newShip.changeLength();
    expect(newShip.length).toBe(4);
});

it("adds +1 hit to hits on ship", () => {
    const newShip = shipFactory(4, 3);
    newShip.hit();
    expect(newShip.hits).toBe(4);
});

it("returns false if ship is not sunk", () => {
    const newShip = shipFactory(5, 3);
    expect(newShip.isSunk()).toBeFalsy()
})

it("returns true if ship is sunk", () => {
    const newShip = shipFactory(3, 3);
    expect(newShip.isSunk()).toBeTruthy()
})

it("test for name", () => {
    const newShip = shipFactory(3, 3);
    expect(newShip.test()).toBe(3);
})

it("test for name", () => {
    const newShip = shipFactory(3, 3);
    newShip.change();
    expect(newShip.length).toBe(4);
})