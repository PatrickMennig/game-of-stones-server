const assert        = require('assert');
const ClosesMill    = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/ClosesMill');
const boardFactory  = require('../../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory   = require('../../../../../src/logic/nine-mens-morris/game/Move');
const playerFactory = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules     = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('ClosesMillHeuristic', function () {

    describe('evaluate', function () {

        it('should return 1 for closing of a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 2);

            const heuristic = new ClosesMill(b, p1, p2, MillRules);
            const eval = heuristic.evaluate(m);

            assert.equal(eval, 1);
        });

        it('should return 0 for not closing of a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 3);

            const heuristic = new ClosesMill(b, p1, p2, MillRules);
            const eval = heuristic.evaluate(m);

            assert.equal(eval, 0);
        });

    });

});
