const Joi = require('joi');

module.exports = Joi.any().required().description('The groupid has to be a groupid known to the server.');