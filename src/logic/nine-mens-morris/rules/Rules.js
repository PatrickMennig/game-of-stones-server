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


        const willBeMill = MillRules.willBeMill(move, board);

        if (willBeMill && move.getRemoveId() === false) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.NO_REMOVE_ID);
        }

        if (willBeMill === false && move.getRemoveId() !== false) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.REMOVE_ID);
        }

        if(willBeMill && move.getRemoveId() !== false && board.getPosition(move.getRemoveId()).isEmpty()) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        if (willBeMill && move.getRemoveId() !== false && board.getPosition(move.getRemoveId()).getToken() !== inactivePlayer.getToken()) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        const numTokensTotal = inactivePlayer.getNumTokensTotal();

        if (willBeMill && numTokensTotal > 3 && MillRules.isInMill(move.getRemoveId(), inactivePlayer.getToken(), board)) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        const numTokensOnBoard = inactivePlayer.getNumTokensOnBoard();

        if (willBeMill && numTokensOnBoard <= 0) {
            return rulesMessageFactory.getMessageWithProperties(false, enumRulesMessages.INVALID_REMOVAL);
        }

        if (willBeMill && numTokensOnBoard === 3 && numTokensTotal === 3) {
            return rulesMessageFactory.getMessageWithProperties(true, enumRulesMessages.WINNING_MOVE, true);
        }


        return rulesMessageFactory.getMessageWithProperties(true, enumRulesMessages.VALID_MOVE);
    }


    static isInMill(positionId, token, board) {
        return MillRules.isInMill(positionId, token, board);
    }

    static willBeMill(move, board) {
        return MillRules.willBeMill(move, board);
    }
}


module.exports = Rules;