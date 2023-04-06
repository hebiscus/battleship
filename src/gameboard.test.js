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

describe("placing a ship on the board", () => {
    const testBoard = gameBoardFactory();
    const perfectShip = shipFactory(3,0,"destroyer");

    beforeEach(() => {
        testBoard.createBoard();;
    });

    afterEach(() => {
        testBoard.currentBoard == [];
    });
    

    it("horizontal ship within the board is properly placed", () => {
        testBoard.placeShip(perfectShip, [3,"A"], "horizontal");
        const boardPlaces = [testBoard.currentBoard[3][0], testBoard.currentBoard[3][1], testBoard.currentBoard[3][2]];
        expect(boardPlaces).toEqual([["destroyer", "NH"], ["destroyer", "NH"], ["destroyer", "NH"]])
    });

    it.only("vertical ship within the board is properly placed", () => {
        testBoard.placeShip(perfectShip, [3,"B"], "horizontal");
        const boardPlaces = [testBoard.currentBoard[3][1], testBoard.currentBoard[3][2], testBoard.currentBoard[3][3]];
        console.log(testBoard.currentBoard)
        expect(boardPlaces).toEqual([["destroyer", "NH"], ["destroyer", "NH"], ["destroyer", "NH"]]);
    });

});  


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

