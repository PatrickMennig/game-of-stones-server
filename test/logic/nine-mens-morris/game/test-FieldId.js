const assert            = require('assert');
const fieldIdFactory    = require('../../../../src/logic/nine-mens-morris/game/FieldId');
const enumFieldIdErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumFieldIdErrors');


describe('FieldId', function () {

    describe('constructor', function () {

        it('should create a field id', function () {
            const fieldId = fieldIdFactory.createFieldId(0);
            assert.equal(fieldId.id, 0);
        });

        it('should not create a field id, too low', function () {
            assert.throws(() => fieldIdFactory.createFieldId(-33), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should create a field id, too high', function () {
            assert.throws(() => fieldIdFactory.createFieldId(742), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should create a field id, no number', function () {
            assert.throws(() => fieldIdFactory.createFieldId('0'), TypeError, enumFieldIdErrors.INVALID_ID);
        });

    });

});