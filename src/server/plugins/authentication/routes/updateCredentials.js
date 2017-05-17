const Joi  = require('joi');
const user = require('../models/user');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/updatecredentials',
        config: {
            auth: {
                strategy: 'jwt'
            },
            description: 'Update credentials of your system account',
            notes: [
                'Send your new password in the body.',
                'Do not use any important password as we are not yet using https.'
            ],
            validate: {
                payload: {
                    password: Joi.string().min(5)
                }
            },
        },
        handler: (request, reply) => {
            const decoded = request.auth.credentials;
            user.changePassword(decoded.username, request.payload.password, (err, user) => {
                if(err) {
                    return reply(err);
                }
                return reply(null);
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'jwt-auth-update-credentials'
};