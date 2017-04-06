const fieldIdFactory = require('./FieldId');
const enumMoveErrors = require('./errors/enumMoveErrors');


class Move {

    constructor(token, toId, fromId=null, removeId=null) {
        this._setToken(token);
        this._toId = fieldIdFactory.createFieldId(toId);
        this._fromId = fromId !== null ? fieldIdFactory.createFieldId(fromId) : null;
        this._removeId = removeId !== null ? fieldIdFactory.createFieldId(removeId) : null;
    }

    _setToken(token) {
        if(typeof token !== 'string' && token.length <= 0) {
            throw new TypeError(enumMoveErrors.NO_TOKEN);
        }
        this._token = token;
    }

    getToken() {
        return this._token;
    }

    getToId() {
        return this._toId.getId();
    }

    getFromId() {
        return this._fromId !== null ? this._fromId.getId() : false;
    }

    getRemoveId() {
        return this._removeId !== null ? this._removeId.getId() : false;
    }

    isPlacingMove() {
        return this.getFromId() === false;
    }

    isNormalMove() {
        return this.getFromId() !== false;
    }

    isRemovingMove() {
        return this.getRemoveId() !== false;
    }

}


exports.createMove = (token, toId, fromId=null, removeId=null) => new Move(token, toId, fromId, removeId);