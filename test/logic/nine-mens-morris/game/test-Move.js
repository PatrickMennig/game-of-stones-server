const assert            = require('assert');
const moveFactory       = require('../../../../src/logic/nine-mens-morris/game/Move');
const enumFieldIdErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumFieldIdErrors');
const enumMoveErrors    = require('../../../../src/logic/nine-mens-morris/game/errors/enumMoveErrors');

const TOKEN = 'a123456';


describe('Move', function () {

    describe('constructor', function () {

        it('should create a move without fromId and removeId', function () {
            const move = moveFactory.createMove(TOKEN, 0);
            assert.equal(move.getToId(), 0);
        });

        it('should create a move with fromId and without removeId', function () {
            const move = moveFactory.createMove(TOKEN, 0, 9);
            assert.equal(move.getFromId(), 9);
        });

        it('should create a move with fromId and removeId', function () {
            const move = moveFactory.createMove(TOKEN, 0, 9, 7);
            assert.equal(move.getRemoveId(), 7);
        });

        it('should not create a move without a toId', function () {
            assert.throws(() => moveFactory.createMove(TOKEN), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move with invalid toId and without fromId and removeId', function () {
            assert.throws(() => moveFactory.createMove(TOKEN, -8610), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move with invalid fromId', function () {
            assert.throws(() => moveFactory.createMove(TOKEN, 24, 9), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move with invalid removeId', function () {
            assert.throws(() => moveFactory.createMove(TOKEN, 3, -44), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move without a token', function () {
            assert.throws(() => moveFactory.createMove(), TypeError, enumMoveErrors.NO_TOKEN);
        })
    });

    describe('is placing move', function () {

        it('should return true for a placing move (phase 1)', function () {
            const move = moveFactory.createMove('token', 0, null, 1);
            assert.equal(move.isPlacingMove(), true);
        });

        it('should return false for a non placing move (phase 1)', function () {
            const move = moveFactory.createMove('token', 0, 1, 3);
            assert.equal(move.isPlacingMove(), false);
        });

    });

    describe('is removing move', function () {

        it('should return true for a removing move', function () {
            const move = moveFactory.createMove('token', 12, null, 3);
            assert.equal(move.isRemovingMove(), true);
        });

        it('should return false for a non removing move', function () {
            const move = moveFactory.createMove('token', 17, 1);
            assert.equal(move.isRemovingMove(), false);
        });

    });

});