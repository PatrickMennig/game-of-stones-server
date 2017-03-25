const enumFieldIdErrors = require('./errors/enumFieldIdErrors');


class FieldId {

    constructor(id) {
        this.id = id;
    }

    set id(id) {
        FieldId.throwIfOutOfRange(id);
        this._id = id;
    }

    get id() {
        return this._id;
    }

    static throwIfOutOfRange(id) {
        if (typeof id !== 'number' || id < 0 || id > 23) {
            throw new TypeError(enumFieldIdErrors.INVALID_ID);
        }
    }

}


exports.createFieldId = (id) => new FieldId(id);