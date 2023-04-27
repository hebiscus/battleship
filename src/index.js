/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import './style.css';
import { GameController } from './game';

function screenController() {
    const game = GameController();
    const placeShipDiv = document.querySelector(".placement-div");
    const playerBoardDiv = document.querySelector(".player-board");
    const computerBoardDiv = document.querySelector(".computer-board");
    const startButton = document.querySelector(".start-btn");
    startButton.disabled = true;
    startButton.addEventListener("click", () => switchGameOn());
    let currentShipDirection = "horizontal";
    game.createShips();
    let currentShipToPlace = game.shipsArray[0];
    placeShipDiv.innerText = `Choose placement for your ${currentShipToPlace.shipType}`;
    let gamePhase = false;
    let placingShipsPhase = true;
    const humanBoard = game.boards[0];
    const computerBoard = game.boards[1];
    humanBoard.createBoard();
    computerBoard.createBoard();
    game.populateComputer();

    const switchGameOn = () => {
        gamePhase = true;
        updateScreen();
    }
    
    const switchShips = (currentShip) => {
        const indexofPrevShip = game.shipsArray.findIndex(ship => ship === currentShip);
        currentShipToPlace = game.shipsArray[indexofPrevShip + 1];
    };

    const nextShipToPlace = (currentShip) => {
        const indexofPrevShip = game.shipsArray.findIndex(ship => ship === currentShip);
        const nextType = game.shipsArray[indexofPrevShip + 1];
        if (nextType === undefined) {
            return "carrier";
        } 
        return nextType.shipType
    }

    const switchShipDirection = () => {
        if (currentShipDirection === "horizontal") {
            currentShipDirection = "vertical";
        } else {
            currentShipDirection = "horizontal";
        };
    };

    const updateScreen = () => {
        playerBoardDiv.replaceChildren();
        computerBoardDiv.replaceChildren();
        humanBoard.currentBoard.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                if (row[i][1].includes("NH")) {
                    square.style.backgroundColor = "#feb05a";
                    square.style.border = "solid black";
                } else if (row[i][1] === "H" && typeof row[i][0] !== "number") {
                    square.style.backgroundColor = "red";
                } else if (row[i][1] === "missed") {
                    square.style.backgroundColor = "blue";
                }
                playerBoardDiv.append(square);
            };
        });
        computerBoard.currentBoard.forEach(row => {
            const numberOfCoordinates = row.length;
            for (let i = 0; i < numberOfCoordinates; i++) {
                const square = document.createElement("div");
                const squareCoordinates = JSON.stringify(row[i]);
                square.dataset.coordinate = squareCoordinates;
                if (row[i][1] === "H" && typeof row[i][0] !== "number") {
                    square.style.backgroundColor = "red";
                    square.style.border = "solid black";
                } else if (row[i][1] === "missed") {
                    square.style.backgroundColor = "blue";
                }
                computerBoardDiv.append(square);
            };
        });
        if (placingShipsPhase === true) {
            renderPlacingShips();
        };
        if (gamePhase === true) {
            renderGame();
        };
    };

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
                addHighlihtPlacing(square, playerBoardSquares);
            });
            square.addEventListener("mouseout", () => {
                if (currentShipToPlace === undefined) {
                    return;
                }
                removeHighlihtPlacing(square, playerBoardSquares);
            });
            // if (!squareCoordinate[1].includes("NH")) {
            //     square.addEventListener("mouseout", () => {
            //         if (currentShipToPlace === undefined) {
            //             return;
            //         }
            //         removeHighlihtPlacing(square, playerBoardSquares);
            //     });
            // };
            square.addEventListener("click", () => {
                if (currentShipToPlace === undefined) {
                    placingShipsPhase = false;
                    placeShipDiv.innerText = "All ships have been placed, start the game!";
                    return;
                }
                humanBoard.placeShip(currentShipToPlace, squareCoordinate, currentShipDirection);
                const nextShipType = nextShipToPlace(currentShipToPlace);
                if (currentShipToPlace.length === 5) {
                    startButton.disabled = false;
                }
                updateScreen();
                placeShipDiv.innerText = `Choose placement for your ${nextShipType}`;
                switchShips(currentShipToPlace);
            })
        });
    };

    const renderGame = () => {
        const computerSquares = Array.from(computerBoardDiv.children);
        computerSquares.forEach(square => {
            const coordinate = JSON.parse(square.dataset.coordinate);
            square.addEventListener("click", () => {
                game.playRound(coordinate);
                updateScreen();
            });
        });
    }

    const addHighlihtPlacing = (squareHigh, board) => {
        const square = squareHigh;
        if ((square.dataset.coordinate === `[9,"G"]` && currentShipToPlace.length === 5) || 
            (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 5 || (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 4)) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 5 || (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 4) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 3)) ||
            (square.dataset.coordinate === `[9,"J"]`)) {
            return;
        }
        if (currentShipDirection === "horizontal") {
            const secondSquare = square.nextSibling;
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
            const squareRow = JSON.parse(square.dataset.coordinate)[0];
            const squareLetter = JSON.parse(square.dataset.coordinate)[1];
            const arrayBoard = Array.from(board);
            const secondSquare = arrayBoard.find(cord => 
                JSON.parse(cord.dataset.coordinate)[0] === squareRow + 1 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter);
            if (secondSquare === undefined) {
                return
            }
            if (currentShipToPlace.length === 2) {
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
            } else if (currentShipToPlace.length === 3) {
                const thirdSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a"
            } else if (currentShipToPlace.length === 4) {
                const thirdSquare =arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                const fourthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 3 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fourthSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
            } else {
                const thirdSquare =arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                const fourthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 3 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fourthSquare === undefined) {
                    return
                }
                const fifthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 4 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fifthSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
                fifthSquare.style.backgroundColor = "#feb05a";
            };
        };
    }

    const removeHighlihtPlacing = (squareHigh, board) => {
        const square = squareHigh;
        if ((square.dataset.coordinate === `[9,"G"]` && currentShipToPlace.length === 5) || 
            (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 5 || (square.dataset.coordinate === `[9,"H"]` && currentShipToPlace.length === 4)) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 5 || (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 4) ||
            (square.dataset.coordinate === `[9,"I"]` && currentShipToPlace.length === 3)) ||
            (square.dataset.coordinate === `[9,"J"]`)) {
            return;
        }
        if (currentShipDirection === "horizontal") {
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
        } else {
            const squareRow = JSON.parse(square.dataset.coordinate)[0];
            const squareLetter = JSON.parse(square.dataset.coordinate)[1];
            const arrayBoard = Array.from(board);
            const secondSquare = arrayBoard.find(cord => 
                JSON.parse(cord.dataset.coordinate)[0] === squareRow + 1 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter);
            if (secondSquare === undefined) {
                return
            }
            if (currentShipToPlace.length === 2) {
                square.style.backgroundColor = "white";
                secondSquare.style.backgroundColor = "white";
            } else if (currentShipToPlace.length === 3) {
                const thirdSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "white"
                secondSquare.style.backgroundColor = "white"
                thirdSquare.style.backgroundColor = "white"
            } else if (currentShipToPlace.length === 4) {
                const thirdSquare =arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                const fourthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 3 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fourthSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "white"
                secondSquare.style.backgroundColor = "white"
                thirdSquare.style.backgroundColor = "white"
                fourthSquare.style.backgroundColor = "white"
            } else {
                const thirdSquare =arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 2 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (thirdSquare === undefined) {
                    return
                }
                const fourthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 3 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fourthSquare === undefined) {
                    return
                }
                const fifthSquare = arrayBoard.find(cord => 
                    JSON.parse(cord.dataset.coordinate)[0] === squareRow + 4 && JSON.parse(cord.dataset.coordinate)[1] === squareLetter)
                if (fifthSquare === undefined) {
                    return
                }
                square.style.backgroundColor = "white"
                secondSquare.style.backgroundColor = "white"
                thirdSquare.style.backgroundColor = "white"
                fourthSquare.style.backgroundColor = "white"
                fifthSquare.style.backgroundColor = "white"
            };
        }
    }

    updateScreen();
    // game.playRound()
}

screenController();


  