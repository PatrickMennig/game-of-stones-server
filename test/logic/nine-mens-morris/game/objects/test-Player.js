const assert           = require('assert');
const playerFactory    = require('../../../../../src/logic/nine-mens-morris/game/objects/player/Player');
const enumPlayerTypes  = require('../../../../../src/logic/nine-mens-morris/game/objects/player/enumPlayerTypes');
const enumPlayerErrors = require('../../../../../src/logic/nine-mens-morris/game/objects/player/enumPlayerErrors');


describe('Player', function () {

    describe('constructor', function () {

        it('should create a player, id has to be correct', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            assert.equal(player.playerId, id);
        });

        it('should create a player, player type has to be correct (BOT)', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should create a player using factory, player type has to be correct (BOT)', function () {
            const id     = 'a12345';
            const player = playerFactory.createBotPlayer(id);
            assert.equal(player.type, enumPlayerTypes.BOT);
        });

        it('should create a player using factory, player type has to be correct (HUMAN)', function () {
            const id     = 'a12345';
            const player = playerFactory.createHumanPlayer(id);
            assert.equal(player.type, enumPlayerTypes.HUMAN);
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
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensInHand, 8);
        });

        it('on board should increase when placing', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensOnBoard, 1);
        });

        it('on board should decrease when losing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensOnBoard, 0);
        });

        it('in total should decrease when losing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            player.placedToken();
            player.lostToken();
            assert.equal(player.numTokensTotal, 8);
        });

        it('in total should not decrease when placing a token', function () {
            const id     = 'a12345';
            const player = playerFactory.createPlayer(id, enumPlayerTypes.BOT);
            player.placedToken();
            assert.equal(player.numTokensTotal, 9);
        });

    });

});