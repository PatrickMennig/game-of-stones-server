const Heuristic = require('./Heuristic');


class NumberOfMills extends Heuristic {

    evaluate(board, playerToken, otherPlayerToken) {

        const results = this.forEachPosition(board, (position, i) => {

            const isOwnMill   = this._millRules.isInMill(i, playerToken, board);
            const isEnemyMill = this._millRules.isInMill(i, otherPlayerToken, board);

            return isOwnMill ? 0.33333 : isEnemyMill ? -0.33333 : 0;
        });

        return Math.round(results.reduce((acc, curr) => acc + curr, 0));
    }

}


module.exports = NumberOfMills;