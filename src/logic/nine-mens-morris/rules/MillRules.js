const millCombinations = {
    0:  [[1, 2],     [9, 21]],
    1:  [[0, 2],     [4, 7]],
    2:  [[0, 1],     [14, 23]],
    3:  [[4, 5],     [10, 18]],
    4:  [[3, 5],     [1, 7]],
    5:  [[3, 4],     [13, 20]],
    6:  [[7, 8],     [11, 15]],
    7:  [[6, 8],     [1, 4]],
    8:  [[6, 7],     [12, 17]],
    9:  [[10, 11],   [0, 21]],
    10: [[9, 11],   [3, 18]],
    11: [[9, 10],   [6, 15]],
    12: [[13, 14],  [8, 17]],
    13: [[12, 14],  [5, 20]],
    14: [[12, 13],  [2, 23]],
    15: [[16, 17],  [6, 11]],
    16: [[15, 17],  [19, 22]],
    17: [[15, 16],  [8, 12]],
    18: [[19, 20],  [3, 10]],
    19: [[18, 20],  [16, 22]],
    20: [[18, 19],  [5, 13]],
    21: [[22, 23],  [0, 9]],
    22: [[21, 23],  [16, 19]],
    23: [[21, 22],  [2, 14]],
};


class MillRules {

    static willBeMill(move, board) {
        const mills = millCombinations[move.getToId()];

        const fromId = move.getFromId();
        const isFromInMill0 = fromId ? mills[0].filter(p => p === fromId).length > 0 : false;
        const isFromInMill1 = fromId ? mills[1].filter(p => p === fromId).length > 0 : false;

        return !isFromInMill0 && isMill(move.getToken(), positionsForMill(mills[0], board))
            || !isFromInMill1 && isMill(move.getToken(), positionsForMill(mills[1], board));
    }

    static willBeMillPos(id, token, board) {
        const mills = millCombinations[id];
        return isMill(token, positionsForMill(mills[0], board))
            || isMill(token, positionsForMill(mills[1], board));
    }

    static isInMill(id, token, board) {
        const mills = millCombinations[id];
        return checkMills(
            token,
            [positionsForMill(mills[0], board).concat([board.getPosition(id)]),
             positionsForMill(mills[1], board).concat([board.getPosition(id)])]
        );
    }

    static getMillCombinations() {
        return millCombinations;
    }
}

module.exports = MillRules;



const positionsForMill = (mill, board) => {
    return mill.map(mId => board.getPosition(mId));
};

const checkMills = (token, mills) => {
    return isMill(token, mills[0]) || isMill(token, mills[1]);
};

const isMill = (token, positions) => {
    for(let i = 0; i < positions.length; ++i) {
        if(positions[i].getToken() !== token) {
            return false;
        }
    }
    return true;
};