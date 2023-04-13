/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import { gameBoardFactory } from "./gameboard";
import { shipFactory } from "./ship";

export const PlayerFactory = () => {

    const attack = function(coordinate, enemyboard) {
        if (this === "player") {
            return coordinate;
        }
        
    }

    return {attack};
};

function switchPlayer() {

}