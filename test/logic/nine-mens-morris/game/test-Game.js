const assert = require('assert');
const gameFactory = require('../../../../src/logic/nine-mens-morris/game/Game');


describe('Game', function () {

    describe('constructor', function () {

        it('should create a new game in status init');

        it('should create a new game with correct meta information');

    });

    describe('factory', function () {

        it('should create a new bot game for one human player with the given id and start the game');

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

        it('should decline a move for an incative player');

        it('should decline a move that is against the rules');

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
