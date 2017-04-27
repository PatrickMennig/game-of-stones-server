module.exports = {
    UNABLE_TO_ADD_PLAYER: 'Unable to add player, two players already joined the game.',
    MISSING_PLAYERS: 'Unable to start game, one or more players are missing.',
    NOT_READY_STATE: 'Unable to start game, game is not in ready state',
    NOT_RUNNING_STATE: 'Unable to resolve move, game is not in running state',
    NOT_ACTIVE_PLAYER: 'The player supplied with the move is not the active player. The game is not aborted, as this is an internal error.',
    INVALID_MOVE: 'The move supplied by the active player is invalid, the game is aborted and the active player has lost.'
};
