const assert           = require('assert');
const playerFactory    = require('../../../../src/logic/nine-mens-morris/game/Player');
const enumPlayerTypes  = require('../../../../src/logic/nine-mens-morris/game/enum/enumPlayerTypes');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');
const enumPlayerErrors = require('../../../../src/logic/nine-mens-morris/game/errors/enumPlayerErrors');


describe('Player', function () {

    describe('constructor', function () {

        it('should create a player, id has to be correct', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            assert.equal(player.playerId, id);
        });

        it('should create a player, player type has to be correct (BOT)', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should create a player using factory, player type has to be correct (BOT)', function () {
            const id     = 'a12345';
            const player = playerFactory.createBotPlayer(id,  enumPositionTokens.TOKEN_PLAYER_ONE);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should create a player using factory, player type has to be correct (HUMAN)', function () {
            const id     = 'a12345';
            const player = playerFactory.createHumanPlayer(id,  enumPositionTokens.TOKEN_PLAYER_ONE);
            assert.equal(player.type, enumPlayerTypes.HUMAN);
        });

        it('should not create a player with a number as id', function () {
            assert.throws(() => playerFactory.createPlayer(12345,  enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT), TypeError, enumPlayerErrors.PLAYER_ID_NOT_A_STRING);
        });

        it('should not create a player with a wrong player type', function () {
            assert.throws(() => playerFactory.createPlayer(12345, enumPositionTokens.TOKEN_PLAYER_ONE, 'WRONG'), TypeError, enumPlayerErrors.PLAYER_TYPE_INVALID);
        });

    });

    describe('number of tokens', function () {

        it('in hand should decrease when placing', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensInHand, 8);
        });

        it('on board should increase when placing', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensOnBoard, 1);
        });

        it('on board should decrease when losing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensOnBoard, 0);
        });

        it('in total should decrease when losing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id,  enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensTotal, 8);
        });

        it('in total should not decrease when placing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id,  enumPositionTokens.TOKEN_PLAYER_ONE, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensTotal, 9);
        });

    });

});