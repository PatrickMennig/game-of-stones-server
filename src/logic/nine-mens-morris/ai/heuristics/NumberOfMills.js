const Heuristic = require('./Heuristic');


class NumberOfMills extends Heuristic {

    evaluate(move) {
        let visitedFieldIds    = {};
        let ownMills           = 0;
        const millCombinations = this._millRules.getMillCombinations();
        let token              = this._player.getToken();

        for (let i = 0; i < 23; ++i) {
            // only look at ids that have not already been evaluated to be in a mill
            if (visitedFieldIds.hasOwnProperty(i)) {
                continue;
            }
            // check for the id if it is in a mill
            if (i == move.getToId() && this._millRules.willBeMill(move, this._board)) {
                ownMills += 1;
                visitedFieldIds[i] = true;
                millCombinations[i][0].forEach(index => visitedFieldIds[index] = true);
                millCombinations[i][1].forEach(index => visitedFieldIds[index] = true);
                continue;
            }

            if (this._millRules.isInMill(i, token, this._board)) {
                ownMills += 1;
                visitedFieldIds[i] = true;
                millCombinations[i][0].forEach(index => visitedFieldIds[index] = true);
                millCombinations[i][1].forEach(index => visitedFieldIds[index] = true);
            }
        }

        let otherMills  = 0;
        visitedFieldIds = {};
        token           = this._otherPlayer.getToken();

        for (let i = 0; i < 23; ++i) {
            // only look at ids that have not already been evaluated to be in a mill
            if (visitedFieldIds.hasOwnProperty(i)) {
                continue;
            }
            // check for the id if it is in a mill
            if (this._millRules.isInMill(i, token, this._board)) {
                otherMills += 1;
                visitedFieldIds[i] = true;
                millCombinations[i][0].forEach(index => visitedFieldIds[index] = true);
                millCombinations[i][1].forEach(index => visitedFieldIds[index] = true);
            }
        }

        return ownMills - otherMills;
    }

}


module.exports = NumberOfMills;