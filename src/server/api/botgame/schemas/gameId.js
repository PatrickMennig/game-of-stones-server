const Joi = require('joi');

module.exports = Joi.any().required().description('The gameid has to be a valid gamid returned from the server.');