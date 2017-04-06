const phaseFactory                   = require('./Phase');
const movementRulesStrategiesFactory = require('./MovementRulesStrategies');

const strategies = {};


class MovementRules {

    static isValidMove(move, player, board) {

        // a move at minimun conforms that there is at least a toId present
        // and that the field indices are in the correct range 0...23

        // check if the current board state allows the move he wants to make
        // from-field occupied by his own token (if present)
        if (move.getFromId() && true !== board.getPosition(move.getFromId()).isOwnToken(player.getToken())) {
            return false;
        }
        // b) to-field is empty
        if (true !== board.getPosition(move.getToId()).isEmpty()) {
            return false;
        }

        // check if the player is moving by an allowed range for the phase he is in
        const strategy = MovementRules._strategyForPhase(phaseFactory.createPhase(player));
        if (true !== strategy.isValidMove(move, board)) {
            return false;
        }

        return true;
    }

    static _strategyForPhase(phase) {
        const phaseName = phase.getPhase();
        if (!strategies[phaseName]) {
            strategies[phaseName] = movementRulesStrategiesFactory.strategyForPhase(phase);
        }
        return strategies[phaseName];
    }
}


module.exports = MovementRules;