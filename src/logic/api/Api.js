const gameFactory    = require('../nine-mens-morris/game/Game');
const playerFactory  = require('../nine-mens-morris/game/Player');
const moveFactory    = require('../nine-mens-morris/game/Move');
const RandomBot      = require('../nine-mens-morris/ai/bot/RandomBot');
const enumGameStates = require('../nine-mens-morris/game/enum/enumGameStates');


class Api {

    static botGame(playerId) {

        const g = gameFactory.createGame();
        g.addPlayer(RandomBot.create());

        return {
            id: g.getId(),
            game: g,
            payload: null
        };
    }

    static versusGame(playerId) {
        const g = gameFactory.createGame();
        return {
            id: g.getId(),
            game: g,
            payload: null
        }
    }

    static joinGame(game, playerId) {

        game.addPlayer(playerFactory.createHumanPlayer(playerId));

        return {
            id: game.getId(),
            game: game,
            payload: game.getStatusMessage()
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

    static resolveMove(game, playerId, turn = null) {

        const player = game.getActivePlayer();

        if (player.getPlayerId() !== playerId) {
            throw new Error('Player trying to send move is not the active player.')
        }

        if (turn) {
            // player moves have to be set, bot moves are calculated when game asks for it
            const move = moveFactory.createMove(player.getToken(), turn.toId, turn.fromId, turn.removeId);
            player.setNextMove(move);
        }

        const msg = game.move();

        return {
            id: game.getId(),
            game: game,
            payload: msg
        }
    }

    static isRunning(state) {
        return state === enumGameStates.STATE_RUNNING;
    }

    static isReady(state) {
        return state === enumGameStates.STATE_READY;
    }

    static isError(state) {
        return state === enumGameStates.STATE_ERROR;
    }

    static isFinished(state) {
        return state === enumGameStates.STATE_FINISHED;
    }


}

module.exports = Api;