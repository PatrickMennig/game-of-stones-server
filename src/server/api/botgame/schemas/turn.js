const Joi = require('joi');

module.exports = Joi.object().required().keys({
    fromId: Joi.number().min(0).max(23),
    toId: Joi.number().min(0).max(23).required(),
    removeId: Joi.number().min(0).max(23)
});