const Heuristic = require('./Heuristic');


class WinningConfiguration extends Heuristic {

    evaluate(move) {
        // can neither lose nor win
        if(this._player.getNumTokensTotal() > 3 && this._otherPlayer.getNumTokensTotal() > 3) {
            return 0;
        }

        // this move is for the player and he wins?
        if(this._otherPlayer.getNumTokensTotal() === 3 && this._millRules.willBeMill(move, this._board)) {
            return 1;
        }
    }
}


module.exports = WinningConfiguration;