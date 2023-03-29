/* eslint-disable no-undef */
import { shipFactory } from "./ship";

it("returns error when made with wrong properties", () => {
    const newShip = shipFactory(3,"2");
    const testShip = shipFactory(3,5);
    expect(newShip).toBe("invalid values");
    expect(testShip).toBe("invalid values");
}) 

it("deletes -1 of current length", () => {
    const newShip = shipFactory(5, 0);
    expect(newShip.changeLength()).toBe(4)
});

it("adds +1 hit to currentHits on ship", () => {
    const newShip = shipFactory(4, 3);
    expect(newShip.hit()).toBe(4)
});

it("returns false if ship is not sunk", () => {
    const newShip = shipFactory(5, 3);
    expect(newShip.isSunk()).toBeFalsy()
})

it("returns true if ship is sunk", () => {
    const newShip = shipFactory(3, 3);
    expect(newShip.isSunk()).toBeTruthy()
})