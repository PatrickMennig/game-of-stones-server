const Joi = require('joi');

module.exports = Joi.array().items(Joi.object().keys({
    gameId: Joi.string().required(),
    timeStarted: Joi.number(),
    timeEnded: Joi.number().allow(null),
    timeLastTurnPlayed: Joi.number().allow(null),
    state: Joi.string().required(),
    activePlayer: Joi.string(),
    inactivePlayer: Joi.string(),
    turnsTaken: Joi.number(),
    boardState: Joi.array().items(Joi.string())
}));