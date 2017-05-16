const assert                = require('assert');
const NumberOfBlockedPieces = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfBlockedPieces');
const boardFactory          = require('../../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory           = require('../../../../../src/logic/nine-mens-morris/game/Move');
const playerFactory         = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules             = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfBlockedNeighborsHeuristic', function () {

    describe('evaluate', function () {

        it('should return 1 for blocking one enemy token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p2.getToken(), id: 0},
                {token: p2.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 2);

            const heuristic = new NumberOfBlockedPieces(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 1);
        });

        it('should return 0 for no blocked tokens', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p2.getToken(), id: 0},
                {token: p2.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 3);

            const heuristic = new NumberOfBlockedPieces(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 0);
        });

        it('should return 3 for three blocked tokens', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p2.getToken(), id: 1},
                {token: p2.getToken(), id: 3},
                {token: p2.getToken(), id: 5}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 4);

            const heuristic = new NumberOfBlockedPieces(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 3);
        });

    });

});
