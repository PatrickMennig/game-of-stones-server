const idGenerator    = require('./idGenerator');
const playerFactory  = require('./Player');
const enumGameErrors = require('./errors/enumGameErrors');
const enumGameStates = require('./enum/enumGameStates');


class Game {

    constructor() {

        this._id = idGenerator.nextId();

        this._playerOne = null;
        this._playerTwo = null;

        this._meta = {
            timeStarted: new Date().getTime(),
            timeEnded: null,
            timeLastTurnPlayed: null,
            state: enumGameStates.STATE_INIT,
            activePlayer: null,
            inactivePlayer: null
        };

        this._moves = [];
    }

    addPlayer(player) {
        if (this._playerOne === null) {
            return this._playerOne = player;
        }

        if (this._playerTwo === null) {

            return this._playerTwo = player;
        }

        throw new Error(enumGameErrors.UNABLE_TO_ADD_PLAYER);
    }

    startGame() {
        if (this._playerOne === null || this._playerTwo === null) {
            throw new Error(enumGameErrors.MISSING_PLAYERS);
        }
    }

}


exports.createGame    = () => new Game();
exports.createBotGame = () => {
    const g = new Game();
    const p = playerFactory.createBotPlayer();
};