const idGenerator          = require('./idGenerator');
const boardFactory         = require('./Board');
const playerFactory        = require('./Player');
const statusMessageFactory = require('./GameStatusMessage');
const Rules                = require('../rules/Rules');
const enumGameErrors       = require('./errors/enumGameErrors');
const enumGameStates       = require('./enum/enumGameStates');


class Game {

    constructor() {

        this._id = idGenerator.nextId();

        this._playerOne = null;
        this._playerTwo = null;

        this._board = boardFactory.createBoard();

        this._meta = {
            gameId: this._id,
            timeStarted: new Date().getTime(),
            timeEnded: null,
            timeLastTurnPlayed: null,
            state: enumGameStates.STATE_INIT,
            activePlayer: null,
            inactivePlayer: null,
            turnsTaken: 0,
            boardState: this._board.getState()
        };

        this._moves = [];
    }

    getId() {
        return this._id;
    }

    getActivePlayer() {
        return this._meta.activePlayer;
    }

    getInactivePlayer() {
        return this._meta.inactivePlayer;
    }

    addPlayer(player) {
        if (this._playerOne === null) {
            this._playerOne = player;
            return status(this._meta);
        }

        if (this._playerTwo === null) {
            this._meta.state = enumGameStates.STATE_READY;
            this._playerTwo  = player;
            return status(this._meta);
        }

        throw new Error(enumGameErrors.UNABLE_TO_ADD_PLAYER);
    }

    startGame() {
        if (this._playerOne === null || this._playerTwo === null) {
            throw new Error(enumGameErrors.MISSING_PLAYERS);
        }
        if (this._meta.state !== enumGameStates.STATE_READY) {
            throw new Error(enumGameErrors.NOT_READY_STATE);
        }

        this._setPlayersStarting();
        this._meta.state = enumGameStates.STATE_RUNNING;

        return status(this._meta);
    }

    getStatusMessage() {
        return status(this._meta);
    }

    move() {

        if(this._meta.state !== enumGameStates.STATE_RUNNING) {
            throw new Error(enumGameErrors.NOT_RUNNING_STATE);
        }

        const move = this._meta.activePlayer.getNextMove();

        const msg = Rules.isValid(move, this._board, this._meta.activePlayer, this._meta.inactivePlayer);

        if (true !== msg.isValid) {
            this._meta.state = enumGameStates.STATE_ERROR;
            throw new Error(enumGameErrors.INVALID_MOVE);
        }

        this._board.resolve(move.getToken(), move.getToId(), move.getFromId(), move.getRemoveId());

        if (move.isPlacingMove()) {
            this._meta.activePlayer.placedToken();
        }

        if (move.isRemovingMove()) {
            this._meta.inactivePlayer.lostToken();
        }

        if (msg.endsGame) {
            this._endGame();
        }

        this._updateMeta(move);

        return status(this._meta);
    }


    _setPlayersStarting() {
        const s                   = this._starting();
        this._meta.activePlayer   = s.start;
        this._meta.inactivePlayer = s.second;
    }

    _starting(rand) {
        return Math.random() < 0.5
            ? {start: this._playerOne, second: this._playerTwo}
            : {start: this._playerTwo, second: this._playerOne};
    }

    _updateMeta(move, endsGame = false) {
        this._moves.push(move);
        this._meta.turnsTaken += 1;
        this._meta.timeLastTurnPlayed = new Date().getTime();
        if (!endsGame) {
            const p                   = this._meta.activePlayer;
            this._meta.activePlayer   = this._meta.inactivePlayer;
            this._meta.inactivePlayer = p;
        }
        this._meta.boardState = this._board.getState()
    }

    _endGame() {
        throw new Error('Not yet implemented');
    }
}


exports.createGame = () => new Game();

exports.createBotGame = (playerId) => {
    const g = new Game();
    const b = playerFactory.createBotPlayer();
    g.addPlayer(b);
    return g;
};


const status   = (meta) => statusMessageFactory.createStatusMessage(meta);