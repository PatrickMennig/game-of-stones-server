const MovementRules       = require('./MovementRules');
const MillRules           = require('./MillRules');
const rulesMessageFactory = require('./RulesMessage');
const enumRulesMessages   = require('./enum/enumRulesMessages');


class Rules {

    static isValid(move, board, activePlayer, inactivePlayer) {

        if (true !== (move.getToken() === activePlayer.getToken())) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.NOT_OWN_TOKEN);
        }

        if (true !== MovementRules.isValidMove(move, activePlayer, board)) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.MOVE_NOT_ALLOWED);
        }

        const willCloseMill  = MillRules.willCloseMill(move, board);
        const isValidRemoval = willCloseMill ? MillRules.isValidRemoval(move, board) : false;

        if (willCloseMill && true !== isValidRemoval) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        const numTokensOnBoard = inactivePlayer.getNumTokensOnBoard();

        if (willCloseMill && isValidRemoval && numTokensOnBoard <= 0) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        if (willCloseMill && isValidRemoval && numTokensOnBoard === 3 && inactivePlayer.getNumTokensTotal() === 3) {
            return rulesMessageFactory.getMessageWithProperties(true, enumRulesMessages.WINNING_MOVE, true);
        }

        return rulesMessageFactory.getMessageWithProperties(true, enumRulesMessages.VALID_MOVE);
    }

    static isInMill(positionId, token, board) {
        throw new Error('Not yet implemented')
    }
}


module.exports = Rules;