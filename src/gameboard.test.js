/* eslint-disable no-undef */
import { gameBoardFactory } from "./gameboard";

it("displays current gameboard state", () => {
    const playerBoard = gameBoardFactory();
    expect(playerBoard.currentBoard).toEqual([]);
});

it.skip("createbaord?", () => {})


it("places ship one the board", () => {
    const playerBoard = gameBoardFactory();
    expect(playerBoard.placeShip()).toEqual();
})