/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import './style.css';
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { game } from './game';

export function firstRender() {
    
}

export function renderBoard(player, boardData) {
    const humanBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");
    
    if (player === "human") {
        boardData.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                humanBoard.append(square);
            };
        });
    } else {
        boardData.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                computerBoard.append(square);
            };
        });
    };
};
