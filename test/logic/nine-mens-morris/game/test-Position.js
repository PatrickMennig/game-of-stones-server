const assert             = require('assert');
const positionFactory    = require('../../../../src/logic/nine-mens-morris/game/Position');
const enumPositionErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumPositionErrors');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');
const enumFieldIdErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumFieldIdErrors');


describe('Position', function () {

    describe('constructor', function () {

        it('should create a position with an empty token', function () {
            const position = positionFactory.createPosition(0);
            assert.equal(position.getToken(), enumPositionTokens.TOKEN_EMPTY);
        });

        it('should not create a position with a string id', function () {
            assert.throws(() => positionFactory.createPosition('0'), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a position with an id lower than 0', function () {
            assert.throws(() => positionFactory.createPosition(-1), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a position with an id lower than 0', function () {
            assert.throws(() => positionFactory.createPosition(Number.NEGATIVE_INFINITY, null), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a position with an id higher than 23', function () {
            assert.throws(() => positionFactory.createPosition(24), TypeError, enumFieldIdErrors.INVALID_ID);
        });

        it('should not create a position with an id higher than 23', function () {
            assert.throws(() => positionFactory.createPosition(Number.POSITIVE_INFINITY), TypeError, enumFieldIdErrors.INVALID_ID);
        });

    });

    describe('tokens', function () {

        it('should correctly set empty token', function () {
            const position = positionFactory.createPosition(0);
            position.setToken('random-token');
            position.setTokenEmpty();
            assert.equal(position.getToken(), enumPositionTokens.TOKEN_EMPTY);
        });

        it('should correctly set player token', function () {
            const position = positionFactory.createPosition(0);
            const P_ID = 'playeroneid';
            position.setToken(P_ID);
            assert.equal(position.getToken(), P_ID);
        });

    });

    describe('isEmpty', function () {

        it('should return true for empty position', function () {
            const position = positionFactory.createPosition(0);
            assert.equal(position.isEmpty(), true);
        });

        it('should return false for occupied position', function () {
            const position = positionFactory.createPosition(0);
            const P_ID = 'playeroneid';
            position.setToken(P_ID);
            assert.equal(position.isEmpty(), false);
        });

    });


    describe('isEnemyToken', function () {

        it('should return true for enemy token', function () {
            const position = positionFactory.createPosition(0);
            const P_ID = 'playeroneid';
            position.setToken(P_ID);
            assert.equal(position.isEnemyToken('MY_TOKEN'), true);
        });

        it('should return false for own token', function () {
            const position = positionFactory.createPosition(0);
            const P_ID = 'playeroneid';
            position.setToken(P_ID);
            assert.equal(position.isEnemyToken(P_ID), false);
        });

    });

    describe('neighbors', function () {

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            position0.setRightNeighbor(position1);
            position1.setLeftNeighbor(position0);
            assert.equal(position0.getRightNeighbor().getId(), position1.getId());
        });

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            position0.setRightNeighbor(position1);
            position1.setLeftNeighbor(position0);
            assert.equal(position1.getLeftNeighbor().getId(), position0.getId());
        });

        it('should correctly set and return the neighbors', function () {
            const position0 = positionFactory.createPosition(0);
            const position1 = positionFactory.createPosition(1);
            const position2 = positionFactory.createPosition(2);
            position0.setRightNeighbor(position1);
            position1.setRightNeighbor(position2);
            assert.equal(position0.getRightNeighbor().getRightNeighbor().getId(), position2.getId());
        });

    });

});

