const assert        = require('assert');
const NumberOfMills = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfMills');
const boardFactory  = require('../../../../../src/logic/nine-mens-morris/game/Board');
const playerFactory = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules     = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfMillsHeuristic', function () {

    describe('evaluate', function () {

        it('should return 1 for only one own mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 2}
            ]);

            const heuristic = new NumberOfMills(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 1);
        });

        it('should return 2 for two own mills', function () {
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


            const heuristic = new NumberOfMills(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 2);
        });

        it('should return 1 for two own mills, one enemy mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 10},
                {token: p1.getToken(), id: 11},
                {token: p2.getToken(), id: 3},
                {token: p2.getToken(), id: 4},
                {token: p2.getToken(), id: 5}
            ]);


            const heuristic = new NumberOfMills(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 1);
        });

    });
});