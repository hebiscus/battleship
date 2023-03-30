/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */


export const shipFactory = (length, hits, sinkStatus) => {
    if ((typeof length !== "number" ) || (typeof hits !== "number") || (hits > length)) {
        return "invalid values";
    }
    const currentLength = length;
    const currentHits = hits;
    let currentSinkStatus = sinkStatus;
    
    const changeLength = function()  {
        this.length -= 1;
    };
    const hit = function()  {
        this.hits += 1;
    };
    const isSunk = () => {
        if (currentLength === currentHits) {
            currentSinkStatus = true;
        } else {
            currentSinkStatus = false;
        }
        return currentSinkStatus;
    };
    
    return {length, hits, sinkStatus, changeLength, hit, isSunk};
}