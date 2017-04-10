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
        if (this.meta.state !== enumGameStates.STATE_INIT) {
            throw new Error(enumGameErrors.NOT_INIT_STATE);
        }

        this._setPlayersStarting();
        this._meta.state = enumGameStates.STATE_RUNNING;

        return status(this._meta);
    }

    getStatusMessage() {
        return status(this._meta);
    }

    move(move, player) {

        if (true !== this.getActivePlayer().equals(player) ) {
            throw new Error(enumGameErrors.NOT_ACTIVE_PLAYER);
        }

        const msg = Rules.isValid(move, this._board, this._meta.activePlayer, this._meta.inactivePlayer);

        if (true !== msg.isValid) {
            throw new Error(enumGameErrors.INVALID_MOVE);
        }

        this._board.resolve(move);

        if(move.isPlacingMove()) {
            this._meta.activePlayer.placedToken();
        }

        if(move.isRemovingMove()) {
            this._meta.inactivePlayer.lostToken();
        }

        if(msg.endsGame) {
            this._endGame();
        }

        this._updateMeta(move);

        return status(this._meta);
    }


    _setPlayersStarting() {
        const starting            = starting(random50());
        this._meta.activePlayer   = starting.start;
        this._meta.inactivePlayer = starting.second;
    }

    _updateMeta(move, endsGame = false) {
        this._moves.push(move);
        this._meta.turnsTaken += 1;
        this._meta.timeLastTurnPlayed = new Date().getTime();
        if(!endsGame) {
            const p = this.getActivePlayer();
            this._meta.activePlayer = this._meta.inactivePlayer;
            this._meta.inactivePlayer = p;
        }
        this._meta.boardState = this._board.getState()
    }

    _endGame() {
        throw new Error('Not yet implemented');
    }
}


exports.createGame            = () => new Game();

exports.createAndStartBotGame = (playerId) => {
    const g = new Game();
    const p = playerFactory.createHumanPlayer(playerId);
    const b = playerFactory.createBotPlayer();
    g.addPlayer(p);
    g.addPlayer(b);
    return g.startGame();
};


const random50 = () => Math.random() < 0.5 ? 0 : 1;
const starting = (rand) => {
    return rand === 0
        ? {start: this._playerOne, second: this._playerTwo}
        : {start: this._playerTwo, second: this._playerOne}
};
const status   = (meta) => statusMessageFactory.createStatusMessage(meta);