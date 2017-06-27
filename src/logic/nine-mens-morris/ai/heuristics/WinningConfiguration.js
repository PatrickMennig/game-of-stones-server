const Heuristic = require('./Heuristic');


class WinningConfiguration extends Heuristic {

    evaluate(board, playerToken, otherPlayerToken) {
        const res = this
            .forEachPosition(board, position => position.isEnemyToken(playerToken) ? 1 : 0)
            .reduce((acc, curr) => acc + curr, 0);
        return res < 3 ? 1 : 0;
    }
}


module.exports = WinningConfiguration;