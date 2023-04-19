/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';
import { renderBoard } from '.';


export function game() {
    const human = playerFactory("human");
    const computer = playerFactory("computer");

    const humanBoard = gameBoardFactory();
    humanBoard.createBoard();
    const computerBoard = gameBoardFactory();
    computerBoard.createBoard();

    renderBoard("human", humanBoard.currentBoard);
    renderBoard("computer", computerBoard.currentBoard);
}

game();