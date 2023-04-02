/* eslint-disable no-undef */
import { gameBoardFactory } from "./gameboard";
import { shipFactory } from "./ship";

it("displays empty board if not created gameboard state", () => {
    const playerBoard = gameBoardFactory();
    expect(playerBoard.currentBoard).toEqual([]);
});

it("checks if board was created correctly", () => {
    const testBoard = gameBoardFactory();
    testBoard.createBoard();
    expect(testBoard.currentBoard.length).toBe(10);
});

describe.skip("displaying proper starting point and ending point of a ship", () => {

})  


describe.skip("placing a ship on the board", () => {
    const playerBoard = gameBoardFactory();
    const niceShip = shipFactory(3,0);
    const mockCallback = jest.fn(x => 42 + x);

    // it("returns coordinate if exists on the board", () => {
    //     playerBoard.createBoard();
    //     playerBoard.placeShip(niceShip, [4,"H"]);
    // })

    it.skip("places ship one the board correctly", () => {
        expect(playerBoard.placeShip(niceShip, [3, "B"])).toEqual();
    });
});

