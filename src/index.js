/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import './style.css';
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { GameController } from './game';

function screenController() {
    const game = GameController();
    const placeShipDiv = document.querySelector(".placement-div");
    const playerBoardDiv = document.querySelector(".player-board");
    const computerBoardDiv = document.querySelector(".computer-board");
    let currentShipDirection = "horizontal";
    game.createShips();
    let currentShipToPlace = game.shipsArray[0];
    const humanBoard = game.boards[0];
    
    const switchShips = (currentShip) => {
        const indexofPrevShip = game.shipsArray.findIndex(ship => ship === currentShip);
        currentShipToPlace = game.shipsArray[indexofPrevShip + 1];
    }

    const switchShipDirection = () => {
        if (currentShipDirection === "horizontal") {
            currentShipDirection = "vertical";
        } else {
            currentShipDirection = "horizontal";
        }
    }

    const updateScreen = () => {
        const computerBoard = game.boards[1];
        humanBoard.createBoard();
        computerBoard.createBoard();
        humanBoard.currentBoard.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                playerBoardDiv.append(square);
            };
        });
        computerBoard.currentBoard.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                computerBoardDiv.append(square);
            };
        });
    }

    const addHighlihtPlacing = (squareHigh) => {
        const square = squareHigh;
        if ((square.dataset.coordinate === `[9,"G"]` && currentShipToPlace.length === 5) || 
            (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 5 || currentShipToPlace.length === 4) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 5 || currentShipToPlace.length === 4 || currentShipToPlace.length === 3) ||
            (square.dataset.coordinate === `[9,"J"]`)) {
            return;
        }
        const secondSquare = square.nextSibling;
        if (currentShipDirection === "horizontal") {
            if (currentShipToPlace.length === 2) {
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
            } else if (currentShipToPlace.length === 3) {
                const thirdSquare = square.nextSibling.nextSibling;
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a"
            } else if (currentShipToPlace.length === 4) {
                const thirdSquare = square.nextSibling.nextSibling;
                const fourthSquare = square.nextSibling.nextSibling.nextSibling;
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
            } else {
                const thirdSquare = square.nextSibling.nextSibling;
                const fourthSquare = square.nextSibling.nextSibling.nextSibling;
                const fifthSquare = square.nextSibling.nextSibling.nextSibling.nextSibling;
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
                fifthSquare.style.backgroundColor = "#feb05a";
            };
        } else {
            if (currentShipToPlace.length === 2) {
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
            } else if (currentShipToPlace.length === 3) {
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a"
            } else if (currentShipToPlace.length === 4) {
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
            } else {
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
                fifthSquare.style.backgroundColor = "#feb05a";
            };
        };
    }

    const removeHighlihtPlacing = (squareHigh) => {
        const square = squareHigh;
        if ((square.dataset.coordinate === `[9,"G"]` && currentShipToPlace.length === 5) || 
            (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 5 || currentShipToPlace.length === 4) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 5 || currentShipToPlace.length === 4 || currentShipToPlace.length === 3) ||
            (square.dataset.coordinate === `[9,"J"]`)) {
            return;
        }
        const secondSquare = square.nextSibling;
        if (currentShipToPlace.length === 2) {
            square.style.backgroundColor = "white"
            secondSquare.style.backgroundColor = "white";
        } else if (currentShipToPlace.length === 3) {
            const thirdSquare = square.nextSibling.nextSibling;
            square.style.backgroundColor = "white"
            secondSquare.style.backgroundColor = "white";
            thirdSquare.style.backgroundColor = "white"
        } else if (currentShipToPlace.length === 4) {
            const fourthSquare = square.nextSibling.nextSibling.nextSibling;
            const thirdSquare = square.nextSibling.nextSibling;
            square.style.backgroundColor = "white";
            secondSquare.style.backgroundColor = "white";
            thirdSquare.style.backgroundColor = "white";
            fourthSquare.style.backgroundColor = "white";
        } else {
            const thirdSquare = square.nextSibling.nextSibling;
            const fourthSquare = square.nextSibling.nextSibling.nextSibling;
            const fifthSquare = square.nextSibling.nextSibling.nextSibling.nextSibling;
            square.style.backgroundColor = "white";
            secondSquare.style.backgroundColor = "white";
            thirdSquare.style.backgroundColor = "white";
            fourthSquare.style.backgroundColor = "white";
            fifthSquare.style.backgroundColor = "white";
        }
    }

    const renderPlacingShips = () =>  {
        const rotateButton = document.querySelector(".rotate-btn");
        rotateButton.addEventListener("click", switchShipDirection);
        const playerBoardSquares = playerBoardDiv.children;
        Array.from(playerBoardSquares).forEach(square => {
            const squareCoordinate = JSON.parse(square.dataset.coordinate);
            square.addEventListener("mouseover", () => {
                if (currentShipToPlace === undefined) {
                    return;
                }
                addHighlihtPlacing(square);
            });
            square.addEventListener("mouseout", () => {
                if (currentShipToPlace === undefined) {
                    return;
                }
                removeHighlihtPlacing(square);
            });
            square.addEventListener("click", () => {
                if (currentShipToPlace === undefined) {
                    placeShipDiv.innerText = "all ships have been placed, start the game smartass"
                    return
                }
                humanBoard.placeShip(currentShipToPlace, squareCoordinate, currentShipDirection);
                switchShips(currentShipToPlace);
            });
        });
    };

    updateScreen();
    renderPlacingShips();
    // game.playRound()
}

screenController();

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


  