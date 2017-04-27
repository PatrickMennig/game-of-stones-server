const Joi           = require('joi');
const schemaGameId  = require('./gameId');
const schemaGroupId = require('./groupId');


module.exports = Joi.object().keys({
    gameId: schemaGameId,
    activePlayerId: schemaGroupId
});