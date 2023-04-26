/* eslint-disable no-undef */
import { playerFactory } from "./player";
import { gameBoardFactory } from "./gameboard";


it("player attacking returns the same coordinate", () => {
    const babyPlayer = playerFactory("human");
    const enemyBoard = gameBoardFactory();
    expect(babyPlayer.attack(enemyBoard, [3,"A"])).toEqual([3,"A"]);
});

it.skip("computer attacking chooses a random coordinate", () => {
    const playerBoard = gameBoardFactory();
    const computer = playerFactory("computer");
    attackMock = jest.fn([3,"A"], "player")
    expect(computer.attack).toBe(4)
})