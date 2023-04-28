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
    const shipsForComputer = createShipsComputer();

    const testShip = shipFactory(1,0,"i am test");

    function createShipsComputer()  {
        const array = [];
        const patrolBoat = shipFactory(2,0, "patrol boat");
        const sumbarine = shipFactory(3,0, "submarine");
        const destroyer = shipFactory(3,0, "destroyer");
        const battleship = shipFactory(4,0, "battleship");
        const carrier = shipFactory(5,0, "carrier");
        array.push(patrolBoat, sumbarine, destroyer, battleship, carrier)
        return array;
    }

    const createShips = () => {
        const patrolBoat = shipFactory(2,0, "patrol boat");
        const sumbarine = shipFactory(3,0, "submarine");
        const destroyer = shipFactory(3,0, "destroyer");
        const battleship = shipFactory(4,0, "battleship");
        const carrier = shipFactory(5,0, "carrier");
        shipsArray.push(patrolBoat, sumbarine, destroyer, battleship, carrier);
    };

    const populateComputer = () => {
        computerBoard.placeShip(shipsForComputer[0], [2, "B"], "horizontal");
        computerBoard.placeShip(shipsForComputer[1], [4, "D"], "vertical");
        computerBoard.placeShip(shipsForComputer[2], [7, "J"], "vertical");
        computerBoard.placeShip(shipsForComputer[3], [9, "A"], "horizontal");
        computerBoard.placeShip(shipsForComputer[4], [3, "H"], "vertical");
    }

    const playRound = (coordinate) => {
        human.attack(computerBoard.currentBoard, coordinate);
        computerBoard.receiveAttack(coordinate);
        const attackedByComputer = computer.attack(humanBoard);
        humanBoard.receiveAttack(attackedByComputer);
        const winner = checkForWin();
        return winner;
    }

    const checkForWin = () => {
        if (computerBoard.areShipsSunk() === true) {
            return human.name;
        } if (humanBoard.areShipsSunk() === true) {
            return computer.name;
        }   
    }
    
    return {players, createShips, shipsArray, boards, playRound, populateComputer}
}
