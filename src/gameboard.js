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
        const shipCoordinates = getShipCoordinates.call(this, shipLength, startingPoint, direction)
        return shipCoordinates;
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
                coordinates.push(validatedCoordinate);
            }
            return coordinates;
        }
        const column = this.currentBoard[startingPoint[1]];
        const row = startingPoint[0];
        const startingPointIndex = column.findIndex()
        for (let i = 1; i < shipLength; i++) {
            
        }
     }

     const isCoordinateValid = function(coordinate) {
        const coordinateString = JSON.stringify(coordinate);
        const boardString = JSON.stringify(this.currentBoard);
        if (boardString.includes(coordinateString)) {
            return coordinate;
        }
        return "coordinate doesn't exist on the board";
     }

     const receiveAttack = function() {

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
const testShip = shipFactory(3,0)
console.log(testBoard.placeShip(testShip, [4,"A"], "horizontal"));
