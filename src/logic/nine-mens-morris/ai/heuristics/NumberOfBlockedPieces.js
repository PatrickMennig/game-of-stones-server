const Heuristic = require('./Heuristic');


class NumberOfBlockedPieces extends Heuristic {

    evaluate(board, playerToken, otherPlayerToken) {

        const result = this.forEachPosition(board, (position) => {

            if (position.isEmpty()) {
                return 0;
            }

            const isBlocked = position
                .getNeighbors()
                .map(neighbor => neighbor !== null && !neighbor.isEmpty())
                .reduce((acc, curr) => acc && curr, true);

            return isBlocked ? position.isOwnToken(playerToken) ? -1 : 1 : 0;
        });

        return result.reduce((acc, curr) => acc + curr, 0);
    }
}

module.exports = NumberOfBlockedPieces;

