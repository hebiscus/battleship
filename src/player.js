/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { gameBoardFactory } from "./gameboard";
import { shipFactory } from "./ship";

export const playerFactory = (name) => {

    const attack = function(enemyboard, coordinate) {
        if (this.name === "human") {
            return coordinate;
        }
        const emptyCoordinates = findEmptyCoordinates(enemyboard);
        const randomRow = Math.floor(Math.random() * emptyCoordinates.length);
        const randomCoord = Math.floor(Math.random() * emptyCoordinates[randomRow].length);
        return emptyCoordinates[randomRow][randomCoord];
    };
    
    return {name, attack};
};

function findEmptyCoordinates(enemyboard) {
    const empty = [];
    enemyboard.currentBoard.forEach(row => {
        const notAttacked = row.filter(coordinate => (coordinate[1] !== "H") && (coordinate[1] !== "missed"));
        if (notAttacked.length === 0) {
            return;
        }
        empty.push(notAttacked);
    })
    return empty;
};
