const assert                = require('assert');
const NumberOfBlockedPieces = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfBlockedPieces');
const boardFactory          = require('../../../../../src/logic/nine-mens-morris/game/Board');
const playerFactory         = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules             = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfBlockedNeighborsHeuristic', function () {

    describe('evaluate', function () {

        it('should return 0 for no blocked tokens', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 1},
                {token: p2.getToken(), id: 2}
            ]);


            const heuristic = new NumberOfBlockedPieces(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 0);
        });

        it('should return 1 for one blocked token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 1},
                {token: p1.getToken(), id: 2},
                {token: p2.getToken(), id: 4}
            ]);

            const heuristic = new NumberOfBlockedPieces(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 1);
        });

        it('should return 0 for one blocked own and enemy token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 1},
                {token: p1.getToken(), id: 2},
                {token: p2.getToken(), id: 3},
                {token: p1.getToken(), id: 4},
                {token: p2.getToken(), id: 5},
                {token: p1.getToken(), id: 7}
            ]);

            const heuristic = new NumberOfBlockedPieces(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 0);
        });

    });

});
