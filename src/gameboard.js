/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

import { shipFactory } from "./ship";

export const gameBoardFactory = (missedAttacks) => {
    const currentBoard = [];
    
    const createBoard = () => {
        const rows = 10;
        const columns = 10;
        const letterArray = ["A","B","C","D","E","F","G","H","I","J"];

        for (let i = 0; i < rows; i++) {
            currentBoard[i] = [];
            for (let j = 0; j < columns; j++) {
                currentBoard[i][j] = [i, letterArray[j]];
            };
        };
    };

     const placeShip = function(ship, coordinate, direction) {
        const startingPoint = isCoordinateValid.call(this, coordinate);
        const shipLength = ship.length;
        const shipCoordinates = getShipCoordinates.call(this, shipLength, startingPoint, direction);
        if (shipCoordinates.length !== shipLength) {
            throw "ship doesn't fit on the board";
        }
        for (let i = 0; i < shipCoordinates.length; i++) {
            const coordinateRow = shipCoordinates[i][0];
            const coordinateColumn = shipCoordinates[i][1];
            const coordinateIndex = this.currentBoard[coordinateRow].findIndex(coordinate => coordinate[1] === coordinateColumn);
            this.currentBoard[coordinateRow][coordinateIndex] = [ship.shipType, "NH"];
        };
     }

     const getShipCoordinates = function (shipLength, startingPoint, direction) {
        const coordinates = [startingPoint];
        if (direction === "horizontal") {
            const row = this.currentBoard[startingPoint[0]];
            const letter = startingPoint[1];
            const startingPointIndex = row.findIndex(coordinate => coordinate[1] === letter);
            for (let i = 1; i < shipLength; i++) {
                const nextCoordinate = row[startingPointIndex + i];
                const validatedCoordinate = isCoordinateValid.call(this, nextCoordinate);
                if (typeof validatedCoordinate !== "string") {
                    coordinates.push(validatedCoordinate);
                };
            }
            return coordinates;
        }
        const column = startingPoint[1];
        const startingRow = startingPoint[0];
        this.currentBoard.forEach(row => {
            const sameLetter = row.find(coordinate => coordinate[1] === column);
            if (sameLetter[0] > startingRow && coordinates.length < shipLength) {
                coordinates.push(sameLetter);
            }
        });
        return coordinates;
     }

     const isCoordinateValid = function(coordinate) {
        const coordinateString = JSON.stringify(coordinate);
        const boardString = JSON.stringify(this.currentBoard);
        if (boardString.includes(coordinateString)) {
            return coordinate;
        }
        throw "coordinate doesn't exist on the board";
     }

     const receiveAttack = function(coordinate) {
        const coordinateRow = coordinate[0];
        const coordinateColumn = coordinate[1];
        const coordinateIndexBoard = this.currentBoard[coordinateRow].findIndex(value => value[1] === coordinateColumn);
        const coordinateOnBoard = this.currentBoard[coordinateRow[coordinateIndexBoard]]
        if (coordinateOnBoard[1] === "NH") {
            // attack was succesfull code
        } else {
            
        }
     };
    
    return {missedAttacks, currentBoard, createBoard, placeShip, receiveAttack};
}

const testBoard = gameBoardFactory();
testBoard.createBoard();
// console.log(JSON.stringify(testBoard.currentBoard));
// console.log(testBoard.currentBoard[4]);

// console.log(JSON.stringify(testBoard.currentBoard[4]))
// const test = JSON.stringify([4,"E"])
// console.log(JSON.stringify(testBoard.currentBoard[4]).indexOf(test));
// const currentRow = testBoard.currentBoard[4];
// const currentLetter = "B"
// const findElement = currentRow.find(element => element[1] == "B");
// console.log(findElement)
const testShip = shipFactory(4,0, "kap")
// console.log(testBoard.placeShip(testShip, [3,"A"], "horizontal"));
// console.log(testBoard.placeShip(testShip, [5,"A"], "horizontal"));
// console.log(testBoard.currentBoard);
// console.log(testBoard.placeShip(testShip, [3,"J"], "horizontal"))
