const gameFactory   = require('../nine-mens-morris/game/Game');
const playerFactory = require('../nine-mens-morris/game/Player');
const moveFactory   = require('../nine-mens-morris/game/Move');


class Api {

    static botGame(playerId) {

        const g = gameFactory.createBotGame(playerId);

        return {
            id: g.getId(),
            game: g,
            payload: null
        };
    }

    static joinGame(game, playerId) {

        game.addPlayer(playerFactory.createHumanPlayer(playerId));

        return {
            id: game.getId(),
            game: game,
            payload: null
        }
    }

    static startGame(game) {

        game.startGame();

        return {
            id: game.getId(),
            game: game,
            payload: game.getStatusMessage()
        }
    }




    static resolveMove(game, groupId, turn) {

        const player = game.getActivePlayer();

        if(player.getPlayerId() !== groupId) {
            throw new Error('Player trying to send move is not the active player.')
        }

        const move = moveFactory.createMove(player.getToken(), turn.toId, turn.fromId, turn.removeId);
        player.setNextMove(move);

        const msg = game.move();

        return {
            id: game.getId(),
            game: game,
            payload: msg
        }
    }





    static versusGame(playerOneId, playerTwoId) {
        const g = gameFactory.createGame();
        g.addPlayer(playerFactory.createHumanPlayer(playerOneId));
        g.addPlayer(playerFactory.createHumanPlayer(playerTwoId));
        g.startGame();
        return g;
    }

    static gameStatusMessage(game) {
        return game.getStatusMessage();
    }


}

module.exports = Api;