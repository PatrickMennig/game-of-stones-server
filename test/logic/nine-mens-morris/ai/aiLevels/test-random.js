const assert      = require('assert');
const gameFactory = require('../../../../../src/logic/nine-mens-morris/game/Game');
const RandomBot   = require('../../../../../src/logic/nine-mens-morris/ai/bot/RandomBot');


describe('randomAi', function () {

    describe('evaluate', function () {

        it('should have the same amount of games won when playing against itself', function () {

            this.timeout(15000);

            let outcomes = 0;
            for (let i = 0; i < 1000; ++i) {
                outcomes += gameRun();
            }
            assert.equal(outcomes < 50 && outcomes > -50, true);
        });

    });
});


const gameRun = () => {
    const game = gameFactory.createGame();
    const r1   = RandomBot.create();
    const r2   = RandomBot.create();

    game.addPlayer(r1);
    game.addPlayer(r2);

    game.startGame();

    while (game.isRunning()) {
        try {
            game.move();
        }
        catch (err) {
            return game.getActivePlayer().getPlayerId() === r1.getPlayerId() ? 1 : -1;
        }
    }

    const msg = game.getStatusMessage();

    return msg.activePlayer === r1.getPlayerId() ? 1 : -1;
};