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
        if (currentShipDirection === "horizontal") {
            if (currentShipToPlace.length === 2) {
                const secondSquare = square.nextSibling;
                if (secondSquare === null) {
                    return;
                }
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
            } else if (currentShipToPlace.length === 3) {
                const secondSquare = square.nextSibling;
                if (secondSquare === null) {
                    return;
                }
                const thirdSquare = square.nextSibling.nextSibling;
                if (thirdSquare === null) {
                    return;
                }
                square.style.backgroundColor = "#feb05a"
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a"
            } else if (currentShipToPlace.length === 4) {
                const secondSquare = square.nextSibling;
                if (secondSquare === null) {
                    return;
                }
                const thirdSquare = square.nextSibling.nextSibling;
                if (thirdSquare === null) {
                    return;
                }
                const fourthSquare = square.nextSibling.nextSibling.nextSibling;
                if (fourthSquare === null) {
                    return;
                }
                square.style.backgroundColor = "#feb05a";
                secondSquare.style.backgroundColor = "#feb05a";
                thirdSquare.style.backgroundColor = "#feb05a";
                fourthSquare.style.backgroundColor = "#feb05a";
            } else {
                const secondSquare = square.nextSibling;
                if (secondSquare === null) {
                    return;
                }
                const thirdSquare = square.nextSibling.nextSibling;
                if (thirdSquare === null) {
                    return;
                }
                const fourthSquare = square.nextSibling.nextSibling.nextSibling;
                if (fourthSquare === null) {
                    return;
                }
                const fifthSquare = square.nextSibling.nextSibling.nextSibling.nextSibling;
                if (fifthSquare === null) {
                    return;
                }
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
        if (currentShipToPlace.length === 2) {
            const secondSquare = square.nextSibling;
            if (secondSquare === null) {
                return;
            }
            square.style.backgroundColor = "white"
            secondSquare.style.backgroundColor = "white";
        } else if (currentShipToPlace.length === 3) {
            const secondSquare = square.nextSibling;
            if (secondSquare === null) {
                return;
            }
            const thirdSquare = square.nextSibling.nextSibling;
            if (thirdSquare === null) {
                return;
            }
            square.style.backgroundColor = "white"
            secondSquare.style.backgroundColor = "white";
            thirdSquare.style.backgroundColor = "white"
        } else if (currentShipToPlace.length === 4) {
            const secondSquare = square.nextSibling;
            if (secondSquare === null) {
                return;
            }
            const thirdSquare = square.nextSibling.nextSibling;
            if (thirdSquare === null) {
                return;
            }
            const fourthSquare = square.nextSibling.nextSibling.nextSibling;
            if (fourthSquare === null) {
                return;
            }
            square.style.backgroundColor = "white";
            secondSquare.style.backgroundColor = "white";
            thirdSquare.style.backgroundColor = "white";
            fourthSquare.style.backgroundColor = "white";
        } else {
            const secondSquare = square.nextSibling;
            if (secondSquare === null) {
                return;
            }
            const thirdSquare = square.nextSibling.nextSibling;
            if (thirdSquare === null) {
                return;
            }
            const fourthSquare = square.nextSibling.nextSibling.nextSibling;
            if (fourthSquare === null) {
                return;
            }
            const fifthSquare = square.nextSibling.nextSibling.nextSibling.nextSibling;
            if (fifthSquare === null) {
                return;
            }
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

function Screen() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Render board squares
      board.forEach(row => {
        row.forEach((cell, index) => {
          // Anything clickable should be a button!!
          const cellButton = document.createElement("button");
          cellButton.classList.add("cell");
          // Create a data attribute to identify the column
          // This makes it easier to pass into our `playRound` function 
          cellButton.dataset.column = index
          cellButton.textContent = cell.getValue();
          boardDiv.appendChild(cellButton);
        })
      })
    }
  
    // Add event listener for the board
    function clickHandlerBoard(e) {
      const selectedColumn = e.target.dataset.column;
      // Make sure I've clicked a column and not the gaps in between
      if (!selectedColumn) return;
      
      game.playRound(selectedColumn);
      updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  