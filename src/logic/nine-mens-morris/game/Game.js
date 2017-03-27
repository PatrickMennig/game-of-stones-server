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

    get meta() {
        return this._meta;
    }

    get board() {
        return this._board;
    }

    get activePlayer() {
        return this._meta.activePlayer;
    }

    get inactivePlayer() {
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
        if (this.meta.state !== enumGameStates.STATE_INIT) {
            throw new Error(enumGameErrors.NOT_INIT_STATE);
        }

        this._setPlayersStarting();
        this._meta.state = enumGameStates.STATE_RUNNING;

        return status(this._meta);
    }

    move(move, player) {

        if (true !== this._meta.activePlayer.equals(player) ) {
            throw new Error(enumGameErrors.NOT_ACTIVE_PLAYER);
        }

        if (true !== Rules.isValidMove(move)) {
            throw new Error(enumGameErrors.INVALID_MOVE);
        }

        this._board.resolveMove(move);

        if(move.isPlacingMove()) {
            this._meta.activePlayer.placedToken();
        }

        if(move.isRemovingMove()) {
            this._meta.inactivePlayer.lostToken();
        }

        // TODO check for game end

        this._updateMeta(move);

        return status(this._meta);
    }

    _setPlayersStarting() {
        const starting            = starting(random50());
        this._meta.activePlayer   = starting.start;
        this._meta.inactivePlayer = starting.second;
    }

    _updateMeta(move) {
        this._moves.push(move);
        this._meta.turnsTaken += 1;
        this._meta.timeLastTurnPlayed = new Date().getTime();
        const p = this.activePlayer;
        this._meta.activePlayer = this._meta.inactivePlayer;
        this._meta.inactivePlayer = p;
        this._meta.boardState = this._board.getState()
    }
}


exports.createGame            = () => new Game();
exports.createAndStartBotGame = (playerId) => {
    const g = new Game();
    const p = playerFactory.createHumanPlayerOne(playerId);
    const b = playerFactory.createBotPlayerTwo();
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