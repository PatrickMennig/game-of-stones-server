const fieldIdFactory     = require('./FieldId');
const enumPositionTokens = require('./enum/enumPositionTokens');
const enumPositionErrors = require('./errors/enumPositionErrors');


class Position {

    constructor(id, neighbors = {top: null, right: null, bottom: null, left: null}) {
        this._setId(id);
        this._neighbors = neighbors;
        this._token     = enumPositionTokens.TOKEN_EMPTY;
    }

    _setId(id) {
        this._id = fieldIdFactory.createFieldId(id);
    }

    getId() {
        return this._id.getId();
    }

    getToken() {
        return this._token;
    }

    isEmpty() {
        return this._token === enumPositionTokens.TOKEN_EMPTY;
    }

    isOwnToken(ownToken) {
        return this._token === ownToken;
    }

    isEnemyToken(ownToken) {
        return this._token !== enumPositionTokens.TOKEN_EMPTY && this._token !== ownToken;
    }

    setTokenEmpty() {
        this._token = enumPositionTokens.TOKEN_EMPTY;
    }

    setToken(token) {
        this._token = token;
    }

    getNeighbors() {
        return Object.keys(this._neighbors).map(k => this._neighbors[k]).filter(n => n !== null);
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

    isNeighborOf(otherPosition) {
        const neighbors  = Object.keys(this._neighbors).map(k => this._neighbors[k]);
        let isNeighbored = false;
        neighbors.forEach(neighbor => {
            if(neighbor === null) {
                return;
            }
            if (neighbor.getId() === otherPosition.getId()) {
                isNeighbored = true;
            }
        });

        return isNeighbored;
    }
}


exports.createPosition = (id, neighbors = undefined) => new Position(id, neighbors);
exports.id             = (id) => fieldIdFactory.createFieldId(id).getId();