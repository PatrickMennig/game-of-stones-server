const Joi         = require('joi');
const createToken = require('../utils/createToken').createToken;
const session     = require('../models/session');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/signin',
        config: {
            auth: 'basic',
            description: 'Login with your system account'
        },
        handler: (request, reply) => {
            const user  = request.auth.credentials.user;
            const token = createToken(user);
            session.putSession(user.id, token, (err, session) => {
                if(err) {
                    throw err;
                }
                return reply().code(201).header('Authorization', session.obj)
            });

        }
    });

    next();
};

exports.register.attributes = {
    name: 'jwt-auth-signin'
};