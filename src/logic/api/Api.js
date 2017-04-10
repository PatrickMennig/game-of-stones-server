const gameFactory   = require('../nine-mens-morris/game/Game');
const playerFactory = require('../nine-mens-morris/game/Player');


class Api {

    static botGame(playerId) {
        return createStartBotGame(playerId);
    }

    static versusGame(playerOneId, playerTwoId) {
        const g = createGame();
        g.addPlayer(playerFactory.createHumanPlayer(playerOneId));
        g.addPlayer(playerFactory.createHumanPlayer(playerTwoId));
        g.startGame();
        return g;
    }

    static resolveMove(game, move, player) {
        return game.move(move, player);
    }

    static gameStatusMessage(game) {
        return game.getStatusMessage();
    }


}


module.exports = Api;


const createStartBotGame = (playerId) => {
    return gameFactory.createAndStartBotGame(playerId);
};

const createGame = () => {
    return gameFactory.createGame();
};
