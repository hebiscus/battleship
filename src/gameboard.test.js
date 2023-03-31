/* eslint-disable no-undef */
import { gameBoardFactory } from "./gameboard";

it("displays current gameboard state", () => {
    const playerBoard = gameBoardFactory();
    expect(playerBoard.currentBoard).toEqual([]);
});

it("checks if board was created correctly", () => {
    const testBoard = gameBoardFactory();
    testBoard.createBoard();
    expect(testBoard.currentBoard.length).toBe(10);
})


it("places ship one the board", () => {
    const playerBoard = gameBoardFactory();
    expect(playerBoard.placeShip()).toEqual();
})