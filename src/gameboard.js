/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

import { shipFactory } from "./ship";

export const gameBoardFactory = () => {
    const currentBoard = [];
    const ships = [];
    const missedAttacks = [];
    
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
        saveShips(ship);
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
     };

     
     const saveShips = function(shipObject) {
        ships.push(shipObject);
     }

     const receiveAttack = function(coordinate) {
        const coordinateRow = coordinate[0];
        const coordinateValue = coordinate[1];
        const columnNumbers = ["A","B","C", "D", "E", "F", "G", "H", "I", "J"];
        const coordinateBoardIndex = columnNumbers.findIndex(value => value === coordinateValue);
        const coordinateOnBoard = this.currentBoard[coordinateRow][coordinateBoardIndex];
        if (coordinateOnBoard[1].includes("NH")) {
            coordinateOnBoard[1] = "H";            
            const hitShip = ships.find(ship => ship.shipType === coordinateOnBoard[0]);
            hitShip.addHit();
            hitShip.isSunk();
            hitShip.changeLength();
        } else {
            coordinateOnBoard[1] = "missed";  
            saveMissedAttacks(coordinate);
        }
     };

     const saveMissedAttacks = function(missedCoordinate) {
        missedAttacks.push(missedCoordinate);
     };

     const areShipsSunk = function() {

     }
    
    return {missedAttacks, currentBoard, ships, createBoard, placeShip, receiveAttack, areShipsSunk};
}

