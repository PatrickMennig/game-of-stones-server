const assert         = require('assert');
const NumberOfTokens = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/NumberOfTokens');
const boardFactory   = require('../../../../../src/logic/nine-mens-morris/game/Board');
const playerFactory  = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules      = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('NumberOfTokensHeuristic', function () {

    describe('evaluate', function () {

        it('should return 0 for same amout of tokens', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 1},
                {token: p1.getToken(), id: 7},
                {token: p2.getToken(), id: 23},
                {token: p1.getToken(), id: 3},
                {token: p2.getToken(), id: 11},
                {token: p1.getToken(), id: 15},
                {token: p2.getToken(), id: 21}
            ]);


            const heuristic = new NumberOfTokens(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 0);
        });

    });

});
