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

describe("saving created ship's in gameboard.ships", () => {
    const testBoard = gameBoardFactory();
    const destroyer = shipFactory(3,0,"destroyer");

    const Mock = jest.fn();

    const placeShipMock = function(ship, coordinate, direction) {
        // const startingPoint = isCoordinateValid.call(this, coordinate);
        // const shipLength = ship.length;
        // const shipCoordinates = getShipCoordinates.call(this, shipLength, startingPoint, direction);
        // if (shipCoordinates.length !== shipLength) {
        //     throw "ship doesn't fit on the board";
        // }
        // for (let i = 0; i < shipCoordinates.length; i++) {
        //     const coordinateRow = shipCoordinates[i][0];
        //     const coordinateColumn = shipCoordinates[i][1];
        //     const coordinateIndex = this.currentBoard[coordinateRow].findIndex(coordinate => coordinate[1] === coordinateColumn);
        //     this.currentBoard[coordinateRow][coordinateIndex] = [ship.shipType, "NH"];
        // }; 
        Mock(ship);
     }
    
    beforeEach(() => {
        testBoard.createBoard();
    });

    it("placing ship on the board saves it in ship array", () => {
        placeShipMock(destroyer, [3,"A"], "horizontal")
        expect(Mock).toHaveBeenCalledWith(destroyer);
    })
})

describe("receiving an attack", () => {
   const testBoard = gameBoardFactory();
   const destroyer = shipFactory(3,0,"destroyer");
   const patrolBoat = shipFactory(3, 0, "patrol boat");
   const submarine = shipFactory(3, 0, "submarine");

    beforeEach(() => {
        testBoard.createBoard();
    });

    afterEach(() => {
        testBoard.currentBoard == [];
        testBoard.ships = [];
    });

    it("logs H for a hit on a ship's coordinate", () => {
        testBoard.placeShip(destroyer, [6,"C"], "vertical");
        testBoard.receiveAttack([6,"C"]);
        expect(testBoard.currentBoard[6][2]).toEqual([destroyer.shipType, "H"]);
    });

    it("changes ship's length after a hit", () => {
        testBoard.placeShip(patrolBoat, [3,"A"], "horizontal");
        testBoard.receiveAttack([3,"B"]);
        expect(patrolBoat.length).toBe(2);
    });

    it("changes ship's hit count after it's been hit", () => {
        testBoard.placeShip(submarine, [8,"D"], "horizontal");
        testBoard.receiveAttack([8,"E"]);
        expect(submarine.hits).toBe(1);
    });


})


