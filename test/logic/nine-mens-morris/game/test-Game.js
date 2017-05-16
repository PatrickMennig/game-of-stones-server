const assert            = require('assert');
const gameFactory       = require('../../../../src/logic/nine-mens-morris/game/Game');
const playerFactory     = require('../../../../src/logic/nine-mens-morris/game/Player');
const moveFactory       = require('../../../../src/logic/nine-mens-morris/game/Move');
const enumGameStates    = require('../../../../src/logic/nine-mens-morris/game/enum/enumGameStates');
const enumGameErrors    = require('../../../../src/logic/nine-mens-morris/game/errors/enumGameErrors');
const enumPositionToken = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');


describe('Game', function () {

    describe('constructor', function () {

        it('should create a new game in status init', function () {
            const g   = gameFactory.createGame();
            const msg = g.getStatusMessage();
            assert.equal(msg.state, enumGameStates.STATE_INIT);
        });

        it('should create a new game with an empty board', function () {
            const g          = gameFactory.createGame();
            const boardState = g.getStatusMessage().boardState;

            const numOfNonEmpty = boardState.filter(p => p !== enumPositionToken.TOKEN_EMPTY).length;

            assert.equal(numOfNonEmpty, 0);
        });
    });

    describe('factory', function () {

        it('should create a new bot game');

    });

    describe('add player', function () {

        it('should add the first player');

        it('should add both players');

        it('should not add a third player');

    });

    describe('start game', function () {

        it('should correctly start a game with two players');

        it('should not start a game with missing players');

        it('should not start a game that is already started or not ready')

    });

    describe('move', function () {

        it('should accept a correct move');

        it('should decline a move for an incative player', function (done) {
            const g  = gameFactory.createGame();
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            g.addPlayer(p1);
            g.addPlayer(p2);
            g.startGame();

            p1.setNextMove(moveFactory.createMove(g.getActivePlayer().getToken(), 3));
            p2.setNextMove(moveFactory.createMove(g.getActivePlayer().getToken(), 2));

            g.move();
            try {
                g.move();
            } catch (err) {
                if(err.message === enumGameErrors.INVALID_MOVE) {
                    return done();
                }
                return done(err);
            }
            return done(new Error('Should throw'));
        });

        it('should decline a move that is against the rules', function (done) {
            const g  = gameFactory.createGame();
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            g.addPlayer(p1);
            g.addPlayer(p2);
            g.startGame();

            p1.setNextMove(moveFactory.createMove(p1.getToken(), 3));
            p2.setNextMove(moveFactory.createMove(p2.getToken(), 3));

            g.move();
            try {
                g.move();
            } catch (err) {
                if(err.message === enumGameErrors.INVALID_MOVE) {
                    return done();
                }
                return done(err);
            }
            return done(new Error('Should throw'));
        });

        it('should correctly update the board according to the move');

        it('should correctly update the player according to the move');

        it('should detect the game end and set meta information accordingly');

        it('should detect game has not ended');

        it('should correctly return updated meta information as game message');

    });

    describe('getGameId', function () {

        it('should return the correct game id');

    });

    describe('getActivePlayer', function () {

        it('should return the currently active player');

    });

    describe('getInactivePlayer', function () {

        it('should return the currently inactive player');

    });

    describe('getStatusMessage', function () {

        it('should return a correct status message');

    });

});
