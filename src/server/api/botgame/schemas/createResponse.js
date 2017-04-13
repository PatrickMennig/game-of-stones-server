const Joi          = require('joi');
const schemaGameId = require('./gameId');

module.exports = Joi.object().keys({
    gameid: schemaGameId
});
