

class GameStatusMessage {

    constructor(gameMeta) {
        this._meta = gameMeta;
    }

    message() {
        return {
            gameId: this._meta.gameId,
            timeStarted: this._meta.timeStarted,
            timeEnded: this._meta.timeEnded,
            timeLastTurnPlayed: this._meta.timeLastTurnPlayed,
            state: this._meta.state,
            activePlayer: this._meta.activePlayer.getPlayerId(),
            inactivePlayer: this._meta.inactivePlayer.getPlayerId(),
            turnsTaken: this._meta.turnsTaken,
            boardSate: this._meta.boardState
        };
    }
}


exports.createStatusMessage = (gameMeta) => new GameStatusMessage(gameMeta).message();