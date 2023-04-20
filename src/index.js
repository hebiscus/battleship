/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import './style.css';
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { game } from './game';


export function firstRender() {
    const rotateButton = document.querySelector(".rotate-btn");
    const shipDirection = rotateShip();
    rotateButton.addEventListener("click", () => {shipDirection});
    const playerBoard = document.querySelector(".player-board");
    const playerBoardSquares = playerBoard.children();
    playerBoardSquares.forEach(square => {
        square.addEventListener("click", () => {})
    })
}

export function renderPlacingShips(playerObject, ships) {
    const playerBoard = document.querySelector(".player-board");
    const playerBoardSquares = playerBoard.children;
    let counter = 0;
    const currentShip = ships[counter];
    Array.from(playerBoardSquares).forEach(square => {
        const squareCoordinate = JSON.parse(square.dataset.coordinate);
        square.addEventListener("click", () => {playerObject.placeShip(currentShip, squareCoordinate, "horizontal")});
        counter += 1;
    })
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

export function rotateShip() {
    let currentChoice = "horizontal";
    if (currentChoice === "horizontal") {
        currentChoice = "vertical";
        return currentChoice;
    }
    currentChoice = "horizontal";
    return currentChoice;
}