const assert             = require('assert');
const moveFactory        = require('../../../../src/logic/nine-mens-morris/game/Move');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');
const enumFieldIdErrors  = require('../../../../src/logic/nine-mens-morris/game/errors/enumFieldIdErrors');


describe('Move', function () {

    describe('constructor', function () {

        it('should create a move without fromId and removeId', function () {
            const move = moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, 0);
            assert.equal(move.toId, 0);
        });

        it('should create a move with fromId and without removeId', function () {
            const move = moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, 0, 9);
            assert.equal(move.fromId, 9);
        });

        it('should create a move with fromId and removeId', function () {
            const move = moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, 0, 9, 7);
            assert.equal(move.removeId, 7);
        });

        it('should not create a move with invalid toId and without fromId and removeId', function () {
            assert.throws(() => moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, -8610), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move with invalid fromId', function () {
            assert.throws(() => moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, 24, 9), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a move with invalid removeId', function () {
            assert.throws(() => moveFactory.createMove(enumPositionTokens.TOKEN_PLAYER_ONE, 3, -44), TypeError, enumFieldIdErrors.INVALID_ID);
        });
    });

    describe('is placing move', function () {

        it('should return true for a placing move (phase 1)', function () {
            const move = moveFactory.createMove('token', 0);
            assert.equal(move.isPlacingMove(), true);
        });

        it('should return false for a non placing move (phase 1)', function () {
            const move = moveFactory.createMove('token', 0, 1);
            assert.equal(move.isPlacingMove(), false);
        });

        it('should return true for a removing move', function () {
            const move = moveFactory.createMove('token', 0, null, 1);
            assert.equal(move.isRemovingMove(), true);
        });

        it('should return false for a non placing move', function () {
            const move = moveFactory.createMove('token', 0, 1);
            assert.equal(move.isRemovingMove(), false);
        });

    });

});