const enumPlayerTypes  = require('./enum/enumPlayerTypes');
const enumPlayerErrors = require('./errors/enumPlayerErrors');


class Player {

    constructor(playerId, type, token) {

        this.playerId          = playerId;
        this.type              = type;
        this._token            = token;

        this._numTokensInHand  = 9;
        this._numTokensTotal   = 9;
        this._numTokensOnBoard = 0;
    }

    set type(type) {
        if (type !== enumPlayerTypes.BOT && type !== enumPlayerTypes.HUMAN) {
            throw new TypeError(enumPlayerErrors.PLAYER_TYPE_INVALID);
        }
        this._type = type;
    }

    get type() {
        return this._type;
    }

    get token() {
        return this._token;
    }

    set playerId(playerId) {
        if (typeof playerId !== 'string') {
            throw new TypeError(enumPlayerErrors.PLAYER_ID_NOT_A_STRING);
        }
        this._playerId = playerId;
    }

    get playerId() {
        return this._playerId;
    }

    get numTokensInHand() {
        return this._numTokensInHand;
    }

    get numTokensOnBoard() {
        return this._numTokensOnBoard;
    }

    get numTokensTotal() {
        return this._numTokensTotal;
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

}


exports.createPlayer      = (playerId, type) => new Player(playerId, type);
exports.createHumanPlayer = playerId => new Player(playerId, enumPlayerTypes.HUMAN);
exports.createBotPlayer   = playerId => new Player(playerId, enumPlayerTypes.BOT);