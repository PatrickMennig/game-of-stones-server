/**
 * Each heuristic looks at the board in its current state,
 * assuming the move to be made.
 * It always looks at the board from the perspective
 * of the moving player.
 *
 * If you need negative values of heuristics you have
 * to consider the perspective.
 *
 * This is not a problem, as each iteration depth-wise of
 * looking at future board states creates new moves from
 * an active players perspective.
 */
class Heuristic {

    constructor(millRules) {
        this._millRules    = millRules;
        this._MAX_FIELD_ID = 23;
    }

    evaluate(board, playerToken, otherPlayerToken) {
        throw new Error('Evaluate method has to be implemented in subclass.');
    }

    forEachPosition(board, fn) {
        const results = [];
        for (let i = 0; i <= this._MAX_FIELD_ID; ++i) {
            results.push(fn(board.getPosition(i), i, board));
        }
        return results;
    }

    static createFn() {
        return (millRules) => new Heuristic(millRules);
    }
}


module.exports = Heuristic;