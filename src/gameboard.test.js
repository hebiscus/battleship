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
    });

    it("rejects placing a vertical ship where there already is one", () => {
        const clingyShip = shipFactory(3, 0, "bonk");
        testBoard.placeShip(perfectShip, [2, "A"], "horizontal");
        expect(() => testBoard.placeShip(clingyShip, [2,"A"], "vertical")).toThrow("coordinate doesn't exist on the board");
    });

    it("rejects placing a horizontal ship where there already is one", () => {
        const clingyShip = shipFactory(3, 0, "bonk");
        testBoard.placeShip(perfectShip, [2, "A"], "horizontal");
        expect(() => testBoard.placeShip(clingyShip, [2,"C"], "horizontal")).toThrow("coordinate doesn't exist on the board");
    });

    it("rejects horizontal ship if it touches another ship directly", () => {
        const clingyShip = shipFactory(3, 0, "destroyer");
        testBoard.placeShip(perfectShip, [1, "A"], "horizontal");
        expect(() => testBoard.placeShip(clingyShip, [2,"A"], "horizontal")).toThrow("ships can't touch one another");
    });

    it("rejects horizontal ship if it touches another ship directly", () => {
        const clingyShip = shipFactory(3, 0, "destroyer");
        testBoard.placeShip(perfectShip, [5, "E"], "horizontal");
        expect(() => testBoard.placeShip(clingyShip, [4,"F"], "vertical")).toThrow("ships can't touch one another");
    });
});  

describe("saving created ship's in gameboard.ships", () => {
    const testBoard = gameBoardFactory();
    const destroyer = shipFactory(3,0,"destroyer");
    
    beforeEach(() => {
        testBoard.createBoard();
    });

    afterEach(() => {
        testBoard.currentBoard = [];
        testBoard.ships = [];
    });

    it("placing ship on the board saves it in ship array", () => {
        testBoard.placeShip(destroyer, [3,"A"], "horizontal")
        expect(testBoard.ships).toContain(destroyer);
    })
})

describe("receiving an attack", () => {
   const testBoard = gameBoardFactory();
   const destroyer = shipFactory(3,0,"destroyer");
   const patrolBoat = shipFactory(3, 0, "patrol boat");
   const submarine = shipFactory(3, 0, "submarine");
   const sunkingShip = shipFactory(2,1," patrol boat");

    beforeEach(() => {
        testBoard.createBoard();
    });

    afterAll(() => {
        testBoard.currentBoard = [];
        testBoard.ships = [];
    });

    it("logs H for a hit on a ship's coordinate", () => {
        testBoard.placeShip(destroyer, [6,"C"], "vertical");
        testBoard.receiveAttack([6,"C"]);
        expect(testBoard.currentBoard[6][2]).toEqual([destroyer.shipType, "H"]);
    });

    it.only("logs H for a hit on a ship's coordinate", () => {
        testBoard.placeShip(destroyer, [6,"C"], "vertical");
        testBoard.receiveAttack([6,"NH"]);
        console.log(testBoard.currentBoard)
        expect(testBoard.currentBoard[6][2]).toEqual([destroyer.shipType, "H"]);
    });

    it("logs missed for an attack that didn't hit a ship", () => {
        const hit = [9, "J"];
        testBoard.receiveAttack(hit);
        expect(testBoard.currentBoard[9][9]).toEqual([hit[0], "missed"])
    })

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

    it("changes ship's sinkStatus when the received hit sunked it", () => {
        testBoard.placeShip(sunkingShip, [1,"H"], "horizontal");
        testBoard.receiveAttack([1,"I"]);
        expect(sunkingShip.sinkStatus).toBeTruthy();
    });
});

describe("keeping track of missed attack", () => {
    const testBoard = gameBoardFactory();

    beforeEach(() => {
        testBoard.createBoard();
    });

    afterEach(() => {
        testBoard.currentBoard = [];
        testBoard.missedAttacks = [];
        testBoard.ships = [];
    });

    it("add missed coordinate after an attack", () => {
        const attacked = [4,"A"]
        testBoard.receiveAttack(attacked);
        expect(testBoard.missedAttacks).toContain(attacked);
    });
});

describe("returning whether all ships on a board are sunk", () => {
    const testBoard = gameBoardFactory();
    const sunkenShip = shipFactory(4,4,"battleship");
    const normalShip = shipFactory(3,1,"destroyer");
    const lovelyShip = shipFactory(2,0,"battleship");

    beforeEach(() => {
        testBoard.createBoard();
    });

    afterEach(() => {
        testBoard.ships = [];
    });

    it("returns true if all ships are sunk", () => {
        testBoard.placeShip(sunkenShip, [5,"A"], "horizontal");
        sunkenShip.sinkStatus = true;
        expect(testBoard.areShipsSunk()).toBeTruthy();
    });

    it("returns false if all ships on the board are not sunk", () => {
        testBoard.placeShip(lovelyShip, [3,"A"], "horizontal");
        testBoard.placeShip(normalShip, [5,"E"], "vertical");
        expect(testBoard.areShipsSunk()).toBeFalsy();
    });
})


