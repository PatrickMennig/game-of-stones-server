

class Heuristic {

    constructor(board, player, otherPlayer, millRules) {
        this._board = board;
        this._player = player;
        this._otherPlayer = otherPlayer;
        this._millRules = millRules;
    }

    evaluate(move, otherPlayer = null) {
        throw new Error('Evaluate method has to be implemented in subclass.');
    }

}


module.exports = Heuristic;