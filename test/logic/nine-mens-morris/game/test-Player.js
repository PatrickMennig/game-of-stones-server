const assert           = require('assert');
const playerFactory    = require('../../../../src/logic/nine-mens-morris/game/Player');
const enumPlayerTypes  = require('../../../../src/logic/nine-mens-morris/game/enum/enumPlayerTypes');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');
const enumPlayerErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumPlayerErrors');

const ID     = 'a12345';


describe('Player', function () {

    describe('constructor', function () {

        it('should create a player, id has to be correct', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            assert.equal(player.playerId, ID);
        });

        it('should create a player, player type has to be correct (BOT)', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should not create a player with a number as id', function () {
            assert.throws(() => playerFactory.createPlayer(12345, enumPlayerTypes.BOT), TypeError, enumPlayerErrors.PLAYER_ID_NOT_A_STRING);
        });

        it('should not create a player with a wrong player type', function () {
            assert.throws(() => playerFactory.createPlayer(12345, 'WRONG'), TypeError, enumPlayerErrors.PLAYER_TYPE_INVALID);
        });

    });

    describe('number of tokens', function () {

        it('in hand should decrease when placing', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensInHand, 8);
        });

        it('on board should increase when placing', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensOnBoard, 1);
        });

        it('on board should decrease when losing a token', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensOnBoard, 0);
        });

        it('in total should decrease when losing a token', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensTotal, 8);
        });

        it('in total should not decrease when placing a token', function () {
            const player = playerFactory.createPlayer(ID, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensTotal, 9);
        });

    });

    describe('equals', function () {

        it('should return true for two players that are equal', function () {
            const p1 = playerFactory.createHumanPlayer(ID);
            assert.equal(p1.equals(p1), true);
        });

        it('should return false for two different players', function () {
           const p1 = playerFactory.createHumanPlayer(ID);
           const p2 = playerFactory.createBotPlayer();
           assert.equal(p1.equals(p2), false);
        });

        it('should return false for a non player object', function () {
            const p1 = playerFactory.createHumanPlayer(ID);
            const nonp2 = {};
            assert.equal(p1.equals(nonp2), false);
        });

    });

    describe('factories', function () {

        it('should create a player using factory, player type has to be correct (BOT)', function () {
            const player = playerFactory.createBotPlayer(ID);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should create a player using factory, player type has to be correct (HUMAN)', function () {
            const player = playerFactory.createHumanPlayer(ID);
            assert.equal(player.type, enumPlayerTypes.HUMAN);
        });

    });

});