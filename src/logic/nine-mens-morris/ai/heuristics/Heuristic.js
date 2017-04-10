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

    constructor(board, player, otherPlayer, millRules) {
        this._board       = board;
        this._player      = player;
        this._otherPlayer = otherPlayer;
        this._millRules   = millRules;
    }

    evaluate(move, otherPlayer = null) {
        throw new Error('Evaluate method has to be implemented in subclass.');
    }
}


module.exports = Heuristic;