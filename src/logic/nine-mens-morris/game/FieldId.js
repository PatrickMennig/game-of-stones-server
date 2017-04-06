const enumFieldIdErrors = require('./errors/enumFieldIdErrors');


class FieldId {

    constructor(id) {
        this._setId(id);
    }

    _setId(id) {
        FieldId._throwIfOutOfRange(id);
        this._id = id;
    }

    getId() {
        return this._id;
    }

    static _throwIfOutOfRange(id) {
        if (typeof id !== 'number' || id < 0 || id > 23) {
            throw new TypeError(enumFieldIdErrors.INVALID_ID);
        }
    }

}


exports.createFieldId = (id) => new FieldId(id);