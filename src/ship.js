/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */


export const shipFactory = (length, hits, sinkStatus) => {
    if ((typeof length !== "number" ) || (typeof hits !== "number") || (hits > length)) {
        return "invalid values";
    }
    
    const changeLength = function()  {
        this.length -= 1;
    };
    const addHit = function()  {
        this.hits += 1;
    };
    const isSunk = function() {
        if (this.length === this.hits) {
            this.sinkStatus = true;
        } else {
            this.sinkStatus = false;
        }
        return this.sinkStatus;
    };
    
    return {length, hits, sinkStatus, changeLength, addHit, isSunk};
}