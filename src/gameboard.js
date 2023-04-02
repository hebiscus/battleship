/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

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

     const placeShip = (ship, coordinate, direction) => {
        const startingPoint = isCoordinateValid(coordinate);
        const shipLength = ship.length;
        const endPoint = 

     }

     const shipCoordinates = function () {

     }

     const determineEnd = function(startingPoint, direction) {

     }

     const isCoordinateValid = function(coordinate) {
        const coordinateString = JSON.stringify(coordinate);
        const boardString = JSON.stringify(testBoard.currentBoard);
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
console.log(JSON.stringify(testBoard.currentBoard));
