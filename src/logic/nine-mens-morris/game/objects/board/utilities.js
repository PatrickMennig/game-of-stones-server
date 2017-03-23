const enumPositionErrors = require('./enumPositionErrors');


exports.throwIfOutOfRange = id => {
    if(typeof id !== 'number' || id < 0 || id > 23) {
        throw new TypeError(enumPositionErrors.INVALID_ID);
    }
};