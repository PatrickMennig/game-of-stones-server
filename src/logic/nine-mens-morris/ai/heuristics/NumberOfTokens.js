const Heuristic = require('./Heuristic');


class NumberOfTokens extends Heuristic {

    evaluate(board, playerToken, otherPlayerToken) {
        return this
            .forEachPosition(board, position => position.isOwnToken(playerToken) ? 1 : position.isEnemyToken(playerToken) ? -1 : 0)
            .reduce((acc, curr) => acc + curr, 0);
    }
}


module.exports = NumberOfTokens;

