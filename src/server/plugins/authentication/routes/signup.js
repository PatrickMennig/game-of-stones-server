const Joi  = require('joi');
const user = require('../models/user');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/signup',
        config: {
            auth: false,
            description: 'Update credentials of your system account',
            notes: [
                'Send your new password in the body.',
                'Do not use any important password as we are not yet using https.'
            ],
            validate: {
                payload: {
                    username: Joi.string().min(3),
                    password: Joi.string().min(5)
                }
            },
        },
        handler: (request, reply) => {

            const { username, password } = request.payload;
            user.create(username, password)
                .then(user => reply('User successfully created. Please sign in with your credentials.').code(201))
                .catch(err => reply(err.message).code(400))

        }
    });

    next();
};

exports.register.attributes = {
    name: 'jwt-auth-signup'
};