const enumPlayerTypes    = require('./enum/enumPlayerTypes');
const enumPlayerErrors   = require('./errors/enumPlayerErrors');
const idGenerator        = require('./idGenerator');


class Player {

    constructor(playerId, type) {

        this._setPlayerId(playerId);
        this._setType(type);

        this._numTokensInHand  = 9;
        this._numTokensTotal   = 9;
        this._numTokensOnBoard = 0;

        this._nextMove = null;
    }

    _setType(type) {
        if (type !== enumPlayerTypes.BOT && type !== enumPlayerTypes.HUMAN) {
            throw new TypeError(enumPlayerErrors.PLAYER_TYPE_INVALID);
        }
        this._type = type;
    }

    getType() {
        return this._type;
    }

    getToken() {
        return this.getPlayerId();
    }

    _setPlayerId(playerId) {
        if (typeof playerId !== 'string') {
            throw new TypeError(enumPlayerErrors.PLAYER_ID_NOT_A_STRING);
        }
        this._playerId = playerId;
    }

    getPlayerId() {
        return this._playerId;
    }

    getNumTokensInHand() {
        return this._numTokensInHand;
    }

    getNumTokensOnBoard() {
        return this._numTokensOnBoard;
    }

    getNumTokensTotal() {
        return this._numTokensTotal;
    }

    equals(other) {
        return (other && typeof other.getPlayerId === 'function') ? this.getPlayerId() === other.getPlayerId() : false;
    }

    placedToken() {
        if (this._numTokensInHand <= 0) {
            throw new Error(enumPlayerErrors.NO_TOKENS_IN_HAND);
        }
        this._numTokensInHand--;
        this._numTokensOnBoard++;
    }

    lostToken() {
        if (this._numTokensTotal <= 0) {
            throw new Error(enumPlayerErrors.NO_TOKENS_LEFT);
        }
        this._numTokensTotal--;
        this._numTokensOnBoard--;
    }

    getNextMove() {
        if (this._nextMove === null) {
            throw new Error(enumPlayerErrors.NO_NEXT_MOVE);
        }
        const move     = this._nextMove;
        this._nextMove = null;
        return move;
    }

    setNextMove(move) {
        this._nextMove = move;
    }

}


exports.createPlayer      = (playerId, type) => new Player(playerId, type);
exports.createHumanPlayer = (playerId) => new Player(playerId, enumPlayerTypes.HUMAN);
exports.createBotPlayer   = () => new Player(`bot_${idGenerator.nextId(8)}`, enumPlayerTypes.BOT);
