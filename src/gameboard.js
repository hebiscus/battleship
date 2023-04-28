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

    // const populateWithRandom = function(ships) {
    //     ships.forEach(ship => {
    //         let randomCoordinate = getRandomCoordinate.call(this);
    //         const randomDirection = getRandomDirection.call(this);
    //         let placingShip = this.placeShip(ship, randomCoordinate, randomDirection)
    //         while (placingShip instanceof Error) {
    //             console.log("ok")
    //             randomCoordinate = getRandomCoordinate();
    //             placingShip = this.placeShip(ship, randomCoordinate, randomDirection);
    //         }
    //         console.log(this.ships)
    //     })
    // }

    // function getRandomCoordinate() {
    //     const randomRow = Math.floor(Math.random() * this.currentBoard.length);
    //     const randomCoord = Math.floor(Math.random() * 11);
    //     return this.currentBoard[randomRow][randomCoord];
    // }

    // function getRandomDirection() {
    //     const directions = ["horizontal", "vertical"];
    //     const randomChoice =  Math.floor(Math.random() * directions.length);
    //     return directions[randomChoice];
    // }

    // function findEmptyCoordinates(enemyboard) {
    //     const empty = [];
    //     enemyboard.currentBoard.forEach(row => {
    //         const notAttacked = row.filter(coordinate => (coordinate[1] !== "H") && (coordinate[1] !== "missed"));
    //         if (notAttacked.length === 0) {
    //             return;
    //         }
    //         empty.push(notAttacked);
    //     })
    //     return empty;
    // };

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
            this.currentBoard[coordinateRow][coordinateIndex] = [ship.shipType, `NH-${i}`];
        }; 
        saveShips.call(this,ship);
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
            if (sameLetter === undefined) {
                return;
            };
            if (sameLetter[0] > startingRow && coordinates.length < shipLength) {
                const valid = isCoordinateValid.call(this, sameLetter)
                coordinates.push(valid);
            }
        });
        return coordinates;
     }

     const isCoordinateValid = function(coordinate) {
        const coordinateString = JSON.stringify(coordinate);
        const boardString = JSON.stringify(this.currentBoard);
        if (boardString.includes(coordinateString)) {
            validateAdjacentCoordinates.call(this, coordinate);
            return coordinate;
        }
        throw "coordinate doesn't exist on the board";
     };

     const validateAdjacentCoordinates = function(coordinate) {
        const columnNumbers = ["A","B","C","D","E","F","G","H","I","J"];
        const coordinateRow = coordinate[0];
        const coordinateValue = coordinate[1];
        const coordinateBoardIndex = columnNumbers.findIndex(value => value === coordinateValue);
        if (coordinateRow === 0) {
        const adjacentCoordinates = [
        this.currentBoard[coordinateRow][coordinateBoardIndex - 1], this.currentBoard[coordinateRow][coordinateBoardIndex + 1],
        this.currentBoard[coordinateRow + 1][coordinateBoardIndex - 1], this.currentBoard[coordinateRow + 1][coordinateBoardIndex],
        this.currentBoard[coordinateRow + 1][coordinateBoardIndex+ 1]];
        const adjacentString = JSON.stringify(adjacentCoordinates);
        if (adjacentString.includes("NH")) {
            throw "ships can't touch one another";
            };
        } else if (coordinateRow === 9) {
        const adjacentCoordinates = [this.currentBoard[coordinateRow - 1][coordinateBoardIndex - 1], 
        this.currentBoard[coordinateRow - 1][coordinateBoardIndex], this.currentBoard[coordinateRow - 1][coordinateBoardIndex + 1],
        this.currentBoard[coordinateRow][coordinateBoardIndex - 1], this.currentBoard[coordinateRow][coordinateBoardIndex + 1]];
        const adjacentString = JSON.stringify(adjacentCoordinates);
        if (adjacentString.includes("NH")) {
            throw "ships can't touch one another";
            };
        } else {
        const adjacentCoordinates = [this.currentBoard[coordinateRow - 1][coordinateBoardIndex - 1], 
        this.currentBoard[coordinateRow - 1][coordinateBoardIndex], this.currentBoard[coordinateRow - 1][coordinateBoardIndex + 1],
        this.currentBoard[coordinateRow][coordinateBoardIndex - 1], this.currentBoard[coordinateRow][coordinateBoardIndex + 1],
        this.currentBoard[coordinateRow + 1][coordinateBoardIndex - 1], this.currentBoard[coordinateRow + 1][coordinateBoardIndex],
        this.currentBoard[coordinateRow + 1][coordinateBoardIndex+ 1]];
        const adjacentString = JSON.stringify(adjacentCoordinates);
        if (adjacentString.includes("NH")) {
            throw "ships can't touch one another";
            };
        };
     };

     const saveShips = function(shipObject) {
        ships.push(shipObject);
     };

     const receiveAttack = function(coordinate) {
        const coordinateRow = coordinate[0];
        const coordinateValue = coordinate[1]; 
        if (coordinateValue.includes("NH")) {
            const foundRow = [];
            this.currentBoard.forEach((row, index )=> {
                const filter = row.find(coordinate => coordinate[0] === coordinateRow && coordinate[1] === coordinateValue);
                if (filter !== undefined) {
                    foundRow.push(index);
                }
            })
            const rowOnBoard = foundRow[0];
            
            const valueOnBoard = this.currentBoard[rowOnBoard].findIndex(coordinate => coordinate[1] === coordinateValue);
            const coordinateOnBoard = this.currentBoard[rowOnBoard][valueOnBoard];
            coordinateOnBoard[1] = "H";          
            const hitShip = this.ships.find(ship => ship.shipType === coordinateRow);
            hitShip.addHit();
            hitShip.isSunk();
            // hitShip.changeLength();
        } else {
            const columnNumbers = ["A","B","C", "D", "E", "F", "G", "H", "I", "J"];
            const coordinateBoardIndex = columnNumbers.findIndex(value => value === coordinateValue);
            const coordinateOnBoard = this.currentBoard[coordinateRow][coordinateBoardIndex];
                coordinateOnBoard[1] = "missed";  
                saveMissedAttacks(coordinate);
        };
     };

     const saveMissedAttacks = function(missedCoordinate) {
        missedAttacks.push(missedCoordinate);
     };

     const areShipsSunk = function() {
        const shipCount = ships.length;
        // this.ships.forEach(ship => {
        //     ship.isSunk()
        // })
        // console.log(this)
        // console.log(this.ships);
        const sunkenShips = ships.filter(ship => ship.sinkStatus === true);
        if (sunkenShips.length === shipCount) {
            return true;
        } 
        return false;
     };
    
    return {missedAttacks, currentBoard, ships, createBoard, placeShip, receiveAttack, areShipsSunk};
}

