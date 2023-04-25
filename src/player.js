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
        const numberOfEmptyCoordinates = emptyCoordinates.length;
        const randomChoice = Math.floor(Math.random() * numberOfEmptyCoordinates);
        return emptyCoordinates[randomChoice];
    };
    
    return {name, attack};
};

function findEmptyCoordinates(enemyboard) {
    const empty = [];
    enemyboard.currentBoard.forEach(row => {
        const notAttacked = row.find(coordinate => (coordinate[1] !== "H") || (coordinate[1] !== "missed"));
        empty.push(notAttacked);
    })
    return empty;
};
