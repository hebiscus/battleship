/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eol-last
import { shipFactory } from './ship';
import { gameBoardFactory } from './gameboard';
import { playerFactory } from './player';

export function GameController() {
    const human = playerFactory("human");
    const computer = playerFactory("computer");
    const players = [human, computer]
    const humanBoard = gameBoardFactory();
    const computerBoard = gameBoardFactory();
    

    const boards = [humanBoard, computerBoard];
    const activePlayer = players[0];
    const shipsArray = [];

    const createShips = () => {
        const patrolBoat = shipFactory(2,0, "patrol boat");
        const sumbarine = shipFactory(3,0, "submarine");
        const destroyer = shipFactory(3,0, "destroyer");
        const battleship = shipFactory(4,0, "battleship");
        const carrier = shipFactory(5,0, "carrier");
        shipsArray.push(patrolBoat, sumbarine, destroyer, battleship, carrier);
        return shipsArray;
    }

    const playRound = (coordinate) => {
        human.attack(computerBoard.currentBoard, coordinate);
        computerBoard.receiveAttack(coordinate);
        console.log(computerBoard.currentBoard);
        const attackedByComputer = computer.attack(humanBoard);
        humanBoard.receiveAttack(attackedByComputer);
        console.log(humanBoard.currentBoard);
    }
    
    return {players, createShips, shipsArray, boards, playRound}
}
