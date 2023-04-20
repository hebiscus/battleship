/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { renderBoard, renderPlacingShips } from '.';


export function game() {
    const human = playerFactory("human");
    const computer = playerFactory("computer");

    const humanBoard = gameBoardFactory();
    humanBoard.createBoard();
    const computerBoard = gameBoardFactory();
    computerBoard.createBoard();

    renderBoard("human", humanBoard.currentBoard);
    renderBoard("computer", computerBoard.currentBoard);

    const ships = getShips();

    renderPlacingShips(humanBoard, ships)
}

game();

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