/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

export const gameBoardFactory = (missedAttacks) => {
    const currentBoard = [];
    
    const createBoard = () => {
        for (let i = 0; i < 100; i++) {
            currentBoard.push("");
        }
    }
     const placeShip = (ship, coordinates) => {

     }
    
    return {missedAttacks, currentBoard, createBoard, placeShip};
}
