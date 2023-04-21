/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { renderBoard, renderPlacingShips } from '.';


export function GameController() {
    const human = playerFactory("human");
    const computer = playerFactory("computer");
    const players = [human, computer]
    const humanBoard = gameBoardFactory();
    const computerBoard = gameBoardFactory();

    const boards = [humanBoard, computerBoard]
    const activePlayer = players[0];
    const shipsArray = [];

    const createShips = () => {
        const patrolBoat = shipFactory(2,0, "patrolBoat");
        const sumbarine = shipFactory(3,0, "submarine");
        const destroyer = shipFactory(3,0, "destroyer");
        const battleship = shipFactory(4,0, "battleship");
        const carrier = shipFactory(5,0, "carrier");
        shipsArray.push(patrolBoat, sumbarine, destroyer, battleship, carrier);
        return shipsArray;
    }

    const playRound = () => {
        humanBoard.createBoard();
        computerBoard.createBoard();
    }
    

    
    return {players, createShips, shipsArray, boards}
}

// game();

function getShips() {
    const shipsArray = [];
    const patrolBoard = shipFactory(2,0)
    const sumbarine = shipFactory(3,0)
    const destroyer = shipFactory(3,0)
    const battleship = shipFactory(4,0)
    const carrier = shipFactory(5,0)
    shipsArray.push(patrolBoard, sumbarine, destroyer, battleship, carrier);
    return shipsArray;
}

function GameControllerTemplate(playerOneName = "Player One",playerTwoName = "Player Two") {
    const board = Gameboard();
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (column) => {
      // Drop a token for the current player
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column}...`
      );
      board.dropToken(column, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
  
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };
  
    // Initial play game message
    printNewRound();
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer
    };
  }