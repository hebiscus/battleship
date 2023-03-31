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

     const placeShip = (ship, coordinates) => {

     }
    
    return {missedAttacks, currentBoard, createBoard, placeShip};
}
