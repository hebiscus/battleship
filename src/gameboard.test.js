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
        expect(boardPlaces).toEqual([[perfectShip.shipType, "NH"], [perfectShip.shipType, "NH"], [perfectShip.shipType, "NH"]])
    });

    it("vertical ship within the board is properly placed", () => {
        testBoard.placeShip(perfectShip, [3,"B"], "vertical");
        const boardPlaces = [testBoard.currentBoard[3][1], testBoard.currentBoard[4][1], testBoard.currentBoard[5][1]];
        expect(boardPlaces).toEqual([["destroyer", "NH"], ["destroyer", "NH"], ["destroyer", "NH"]]);
    });

    it("ship that doesn't fit on the board horizontally cannot be placed", () => {
        expect(() => testBoard.placeShip(perfectShip, [3,"J"], "horizontal")).toThrow("coordinate doesn't exist on the board");
    });

    it("ship that doesn't fit on the board vertically cannot be placed", () => {
        expect(() => testBoard.placeShip(perfectShip, [9,"J"], "vertical")).toThrow("ship doesn't fit on the board");
    })
});  

describe("receiving an attack", () => {
   const testBoard = gameBoardFactory();
   const destroyer = shipFactory(3,0,"destroyer");

    beforeEach(() => {
        testBoard.createBoard();
    });

    afterEach(() => {
        testBoard.currentBoard == [];
    });

    it("logs H for a hit on a ship's coordinate", () => {
        testBoard.placeShip(destroyer, [6,"C"], "vertical");
        testBoard.receiveAttack([6,"C"]);
        expect(testBoard.currentBoard[6][2]).toEqual([destroyer.shipType, "H"]);
    });

    it.skip("changes ship's length after a hit", () => {
        testBoard.placeShip(destroyer, [5,"D"], "horizontal");
        testBoard.receiveAttack([6,"C"]);
    })
})


