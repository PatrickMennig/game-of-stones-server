const Heuristic = require('./Heuristic');


class NumberOfTokens extends Heuristic {

    evaluate(move) {

        const willBeMill = this._millRules.willBeMill(move, this._board);

        const add = willBeMill ? 1 : 0;

        return this._player.getNumTokensTotal() - this._otherPlayer.getNumTokensTotal() + add;
    }
}


module.exports = NumberOfTokens;

