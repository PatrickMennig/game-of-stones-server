const enumPositionTokens = require('./enumPositionTokens');
const enumPositionErrors = require('./enumPositionErrors');
const utilities = require('./utilities');


class Position {

    constructor(id, neighbors = {top: null, right: null, bottom: null, left: null}) {
        utilities.throwIfOutOfRange(id);
        this._id = id;
        this._neighbors = neighbors;
        this._token     = enumPositionTokens.TOKEN_EMPTY;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    setTokenEmpty() {
        this._token = enumPositionTokens.TOKEN_EMPTY;
    }

    setTokenPlayerOne() {
        this._token = enumPositionTokens.TOKEN_PLAYER_ONE;
    }

    setTokenPlayerTow() {
        this._token = enumPositionTokens.TOKEN_PLAYER_TWO;
    }

    getTopNeighbor() {
        if(typeof this._neighbors.top !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.top;
    }

    setTopNeighbor(neighbor) {
        this._neighbors.top = neighbor;
    }

    getRightNeighbor() {
        if(typeof this._neighbors.right !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.right;
    }

    setRightNeighbor(neighbor) {
        this._neighbors.right = neighbor;
    }

    getBottomNeighbor() {
        if(typeof this._neighbors.bottom !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.bottom;
    }

    setBottomNeighbor(neighbor) {
        this._neighbors.bottom = neighbor;
    }

    getLeftNeighbor() {
        if(typeof this._neighbors.left !== 'object') {
            throw new Error(enumPositionErrors.POSITION_NOT_SET);
        }
        return this._neighbors.left;
    }

    setLeftNeighbor(neighbor) {
        this._neighbors.left = neighbor;
    }

}

exports.createPosition = (id, neighbors=undefined) => new Position(id, neighbors);
