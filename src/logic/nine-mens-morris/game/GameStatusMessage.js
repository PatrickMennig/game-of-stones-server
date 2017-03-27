

class GameStatusMessage {

    constructor(gameMeta) {
        this._meta = gameMeta;
    }

    message() {
        return {
            timeStarted: this._meta.timeStarted,
            timeEnded: this._meta.timeEnded,
            timeLastTurnPlayed: this._meta.timeLastTurnPlayed,
            state: this._meta.state,
            activePlayer: this._meta.activePlayer.playerId,
            inactivePlayer: this._meta.inactivePlayer.playerId,
            turnsTaken: this._meta.turnsTaken,
            boardSate: this._meta.boardState
        };
    }
}


exports.createStatusMessage = (gameMeta) => new GameStatusMessage(gameMeta).message();