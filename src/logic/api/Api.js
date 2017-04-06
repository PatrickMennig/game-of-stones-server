const gameFactory   = require('../nine-mens-morris/game/Game');
const playerFactory = require('../nine-mens-morris/game/Player');


class Api {

    static botGame(playerId, store = null) {
        return Api._storeGame(store, Api._createStartBotGame(playerId));
    }

    static versusGame(playerOneId, playerTwoId, store = null) {
        const g = Api._createGame();
        g.addPlayer(playerFactory.createHumanPlayer(playerOneId));
        g.addPlayer(playerFactory.createHumanPlayer(playerTwoId));
        g.startGame();
        return Api._storeGame(store, g);
    }

    static activePlayer(game = null, store = null, gameId = null) {
        if(game == null) {
            game = Api._getStoredGame(gameId);
        }
        return game.getActivePlayer();
    }

    static resolveMove(move, player, game = null, store = null, gameId = null) {
        if(game == null) {
            game = Api._getStoredGame(gameId);
        }
        return game.move(move, player);
    }


    static _createStartBotGame(playerId) {
        return gameFactory.createAndStartBotGame(playerId);
    }

    static _createGame() {
        return gameFactory.createGame();
    }

    static _isStore(store) {
        return store && typeof store.put === 'function' && typeof store.get === 'function';
    }

    static _storeGame(store, game) {
        if (Api._isStore(store)) {
            store.put(game.getGameId(), game);
            return game;
        }
        throw new Error('Store supplied seems not to conform to store protocol');
    }

    static _getStoredGame(store, id) {
        if (Api._isStore(store)) {
            return store.get(id);
        }
        throw new Error('Store supplied seems not to conform to store protocol');
    }

}

module.exports = Api;