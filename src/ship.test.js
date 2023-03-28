/* eslint-disable no-undef */
import { shipFactory } from "./ship";


it("deletes -1 of current length", () => {
    const newShip = shipFactory(5);
    expect(newShip.changeLength()).toBe(4)
});

it("adds +1 hit to currentHits on ship", () => {
    const newShip = shipFactory(0, 3);
    expect(newShip.hit()).toBe(4)
});

it("returns false if ship is not sunk", () => {
    const newShip = shipFactory(0, 3);
    expect(newShip.isSunk()).toBeFalsy()
})

it("returns true if ship is sunk", () => {
    const newShip = shipFactory(3, 3);
    expect(newShip.isSunk()).toBeTruthy()
})