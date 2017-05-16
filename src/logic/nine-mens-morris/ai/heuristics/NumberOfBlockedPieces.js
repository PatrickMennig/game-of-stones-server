const Heuristic = require('./Heuristic');


class NumberOfBlockedPieces extends Heuristic {

    evaluate(move) {

        const token = this._player.getToken();

        const neighbors = this._board.getPosition(move.getToId()).getNeighbors();
        const blockedNeighbors = neighbors.filter(n => {
            if(n === null) {
                return false;
            }
            return n.isEnemyToken(token)
        });

        return blockedNeighbors.length;
    }
}


module.exports = NumberOfBlockedPieces;

