const assert        = require('assert');
const NumberOfMills = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfMills');
const boardFactory  = require('../../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory   = require('../../../../../src/logic/nine-mens-morris/game/Move');
const playerFactory = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules     = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfMillsHeuristic', function () {

    describe('evaluate', function () {

        it('should return 1 for only one own mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 2);

            const heuristic = new NumberOfMills(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 1);
        });

        it('should return 2 for two own mills, one of them closing', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 10},
                {token: p1.getToken(), id: 11}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 2);

            const heuristic = new NumberOfMills(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 2);
        });

        it('should return 2 for two own mills, none of them closing', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 10},
                {token: p1.getToken(), id: 11}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 23);

            const heuristic = new NumberOfMills(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 2);
        });

        it('should return 1 for two own mills, none of them closing, one enemy mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 10},
                {token: p1.getToken(), id: 11},
                {token: p2.getToken(), id: 21},
                {token: p2.getToken(), id: 22},
                {token: p2.getToken(), id: 23},
            ]);

            const m = moveFactory.createMove(p1.getToken(), 3);

            const heuristic = new NumberOfMills(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 1);
        });
    });
});