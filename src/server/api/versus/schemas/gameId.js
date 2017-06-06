const Joi = require('joi');

module.exports = Joi.any().required().description('The gameId has to be a valid gamid returned from the server.');