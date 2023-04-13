/* eslint-disable no-undef */
import { playerFactory } from "./player";
import { gameBoardFactory } from "./gameboard";


it("player attacking returns the same coordinate", () => {
    const babyPlayer = playerFactory("player");
    expect(babyPlayer.attack([3,"A"])).toEqual([3,"A"]);
});

it.skip("computer attacking chooses a random coordinate", () => {
    const playerBoard = gameBoardFactory();
    const computer = playerFactory("computer");
})