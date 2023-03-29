/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */


export const shipFactory = (length, hits, sinkStatus) => {
    if (typeof length !== "number" || typeof hits !== "number" || hits > length) {
        return "invalid values";
    }
    let currentLength = length;
    let currentHits = hits;
    let currentSinkStatus = sinkStatus;
    
    const changeLength = () =>  {
        currentLength -= 1;
        return currentLength;
    }
    const hit = () => {
        currentHits += 1;
        return currentHits;
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