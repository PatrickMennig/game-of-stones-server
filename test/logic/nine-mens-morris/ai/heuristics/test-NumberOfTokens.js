const assert         = require('assert');
const NumberOfTokens = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfTokens');
const boardFactory   = require('../../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory    = require('../../../../../src/logic/nine-mens-morris/game/Move');
const playerFactory  = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules      = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfTokensHeuristic', function () {

    describe('evaluate', function () {

        it('should return 3 for three more tokens without mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1}
            ]);

            for(let i = 0; i < 3; ++i) {
                p2.lostToken();
            }

            const m = moveFactory.createMove(p1.getToken(), 3);

            const heuristic = new NumberOfTokens(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 3);
        });


        it('should return 0 for the same amount of tokens without mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p2.getToken(), id: 0},
                {token: p2.getToken(), id: 1}
            ]);

            const m = moveFactory.createMove(p1.getToken(), 3);

            const heuristic = new NumberOfTokens(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 0);
        });

        it('should return 3 for three more tokens after closing mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1}
            ]);

            for(let i = 0; i < 2; ++i) {
                p2.lostToken();
            }

            const m = moveFactory.createMove(p1.getToken(), 2);

            const heuristic = new NumberOfTokens(b, p1, p2, MillRules);
            const eval      = heuristic.evaluate(m);

            assert.equal(eval, 3);
        });

    });

});
