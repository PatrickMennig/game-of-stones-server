const Heuristic = require('./Heuristic');


class ClosesMill extends Heuristic {

    evaluate(move) {
        if(this._millRules.willBeMill(move, this._board)) {
            return 1;
        }
        return 0;
    }
}


module.exports = ClosesMill;

