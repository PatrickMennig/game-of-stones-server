const fieldIdFactory = require('./FieldId');


class Move {

    constructor(token, toId, fromId=null, removeId=null) {
        this._token = token;
        this._toId = fieldIdFactory.createFieldId(toId);
        this._fromId = fromId !== null ? fieldIdFactory.createFieldId(fromId) : null;
        this._removeId = removeId !== null ? fieldIdFactory.createFieldId(removeId) : null;
    }

    get token() {
        return this._token;
    }

    get toId() {
        return this._toId.id;
    }

    get fromId() {
        return this._fromId !== null ? this._fromId.id : false;
    }

    get removeId() {
        return this._removeId !== null ? this._removeId.id : false;
    }

}


exports.createMove = (token, toId, fromId=null, removeId=null) => new Move(token, toId, fromId, removeId);