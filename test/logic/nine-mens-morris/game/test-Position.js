const assert             = require('assert');
const positionFactory    = require('../../../../src/logic/nine-mens-morris/game/Position');
const enumPositionErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumPositionErrors');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');


describe('Position', function () {

    describe('constructor', function () {

        it('should create a position with an empty token', function () {
            const position = positionFactory.createPosition(0);
            assert.equal(position.token, enumPositionTokens.TOKEN_EMPTY);
        });

        it('should not create a position with a string id', function () {
            assert.throws(() => positionFactory.createPosition('0'), TypeError, enumPositionErrors.INVALID_ID);
        });

        it('should not create a position with an id lower than 0', function () {
            assert.throws(() => positionFactory.createPosition(-1), TypeError, enumPositionErrors.INVALID_ID);
        });

        it('should not create a position with an id lower than 0', function () {
            assert.throws(() => positionFactory.createPosition(Number.NEGATIVE_INFINITY, null), TypeError, enumPositionErrors.INVALID_ID);
        });

        it('should not create a position with an id higher than 23', function () {
            assert.throws(() => positionFactory.createPosition(24), TypeError, enumPositionErrors.INVALID_ID);
        });

        it('should not create a position with an id higher than 23', function () {
            assert.throws(() => positionFactory.createPosition(Number.POSITIVE_INFINITY), TypeError, enumPositionErrors.INVALID_ID);
        });

    });

    describe('tokens', function () {

        it('should correctly set empty token', function () {
            const position = positionFactory.createPosition(0);
            position.setToken('random-token');
            position.setTokenEmpty();
            assert.equal(position.token, enumPositionTokens.TOKEN_EMPTY);
        });

        it('should correctly set player token', function () {
            const position = positionFactory.createPosition(0);
            const P_ID = 'playeroneid';
            position.setToken(P_ID);
            assert.equal(position.token, P_ID);
        });
    });

    describe('neighbors', function () {

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            position0.setRightNeighbor(position1);
            position1.setLeftNeighbor(position0);
            assert.equal(position0.getRightNeighbor().id, position1.id);
        });

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            position0.setRightNeighbor(position1);
            position1.setLeftNeighbor(position0);
            assert.equal(position1.getLeftNeighbor().id, position0.id);
        });

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            const position2 = positionFactory.createPosition(2);
            position0.setRightNeighbor(position1);
            position1.setRightNeighbor(position2);
            assert.equal(position0.getRightNeighbor().getRightNeighbor().id, position2.id);
        });

    });

});

