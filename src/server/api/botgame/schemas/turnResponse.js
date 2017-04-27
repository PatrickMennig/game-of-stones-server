const Joi           = require('joi');
const schemaGameId  = require('./gameId');
const schemaGroupId = require('./groupId');


module.exports = Joi.object().keys({
    gameId: schemaGameId,
    activePlayer: schemaGroupId,
    boardState: Joi.any(),
    timeStarted: Joi.number(),
    timeLastTurnPlayed: Joi.number().allow(null),
    state: Joi.string(),
    turnsTaken: Joi.number()
});