const assert               = require('assert');
const WinningConfiguration = require('../../../../../src/logic/nine-mens-morris/ai/heuristics/WinningConfiguration');
const boardFactory         = require('../../../../../src/logic/nine-mens-morris/game/Board');
const playerFactory        = require('../../../../../src/logic/nine-mens-morris/game/Player');
const MillRules            = require('../../../../../src/logic/nine-mens-morris/rules/MillRules');


describe('WinningConfigurationHeuristic', function () {

    describe('evaluate', function () {

        it('should return 0 for not winning', function () {
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


            const heuristic = new WinningConfiguration(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 0);
        });

        it('should return 1 for winning', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 1},
                {token: p1.getToken(), id: 7},
                {token: p2.getToken(), id: 23},
                {token: p1.getToken(), id: 16},
            ]);


            const heuristic = new WinningConfiguration(MillRules);
            const eval      = heuristic.evaluate(b, p1.getToken(), p2.getToken());

            assert.equal(eval, 1);
        });

    });

});
