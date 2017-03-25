const enumPlayerTypes    = require('./enum/enumPlayerTypes');
const enumPlayerErrors   = require('./errors/enumPlayerErrors');
const enumPositionTokens = require('./enum/enumPositionTokens');
const PLAYER_BOT_ID      = 'botplayer';


class Player {

    constructor(playerId, token, type) {

        this.playerId = playerId;
        this.type     = type;
        this._token   = token;

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


exports.createPlayer         = (playerId, token, type) => new Player(playerId, token, type);
exports.createHumanPlayer    = (playerId, token) => new Player(playerId, token, enumPlayerTypes.HUMAN);
exports.createHumanPlayerOne = (playerId) => new Player(playerId, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.HUMAN);
exports.createHumanPlayerOne = (playerId) => new Player(playerId, enumPositionTokens.TOKEN_PLAYER_TWO, enumPlayerTypes.HUMAN);
exports.createBotPlayer      = (token) => new Player(PLAYER_BOT_ID, token, enumPlayerTypes.BOT);
exports.createBotPlayerTwo   = () => new Player(PLAYER_BOT_ID, enumPositionTokens.TOKEN_PLAYER_TWO, enumPlayerTypes.BOT);