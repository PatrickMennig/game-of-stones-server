const Joi = require('joi');

module.exports = Joi.object().required().keys({
    fromId: Joi.number().integer().min(0).max(23),
    toId: Joi.number().integer().min(0).max(23).required(),
    removeId: Joi.number().integer().min(0).max(23)
});