const enumPositionTokens = require('./enum/enumPositionTokens');
const enumPositionErrors = require('./errors/enumPositionErrors');
const fieldIdFactory     = require('./FieldId');


class Position {

    constructor(id, neighbors = {top: null, right: null, bottom: null, left: null}) {
        this.id         = id;
        this._neighbors = neighbors;
        this._token     = enumPositionTokens.TOKEN_EMPTY;
    }

    set id(id) {
        this._id = fieldIdFactory.createFieldId(id);
    }

    get id() {
        return this._id.id;
    }

    get token() {
        return this._token;
    }

    isEmpty() {
        return this._token === enumPositionTokens.TOKEN_EMPTY;
    }

    hasEnemyToken(ownToken) {
        return this._token !== enumPositionTokens.TOKEN_EMPTY && this._token !== ownToken;
    }

    setTokenEmpty() {
        this._token = enumPositionTokens.TOKEN_EMPTY;
    }

    setToken(token) {
        if (token !== enumPositionTokens.TOKEN_PLAYER_ONE
            && token !== enumPositionTokens.TOKEN_PLAYER_TWO
            && token !== enumPositionTokens.TOKEN_EMPTY) {
            throw new Error(enumPositionErrors.INVALID_TOKEN);
        }
        this._token = token;
    }

    setTokenPlayerOne() {
        this._token = enumPositionTokens.TOKEN_PLAYER_ONE;
    }

    setTokenPlayerTow() {
        this._token = enumPositionTokens.TOKEN_PLAYER_TWO;
    }

    getTopNeighbor() {
        if (typeof this._neighbors.top !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.top;
    }

    setTopNeighbor(neighbor) {
        this._neighbors.top = neighbor;
    }

    getRightNeighbor() {
        if (typeof this._neighbors.right !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.right;
    }

    setRightNeighbor(neighbor) {
        this._neighbors.right = neighbor;
    }

    getBottomNeighbor() {
        if (typeof this._neighbors.bottom !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.bottom;
    }

    setBottomNeighbor(neighbor) {
        this._neighbors.bottom = neighbor;
    }

    getLeftNeighbor() {
        if (typeof this._neighbors.left !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.left;
    }

    setLeftNeighbor(neighbor) {
        this._neighbors.left = neighbor;
    }


}


exports.createPosition = (id, neighbors = undefined) => new Position(id, neighbors);