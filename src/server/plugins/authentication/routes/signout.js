const Joi               = require('joi');
const invalidateSession = require('../utils/invalidateSession');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/signout',
        config: {
            auth: 'jwt',
            description: 'Logout from your system account'
        },
        handler: (request, reply) => {
            const decoded  = request.auth.credentials;
            invalidateSession(decoded, (err) => {
                if(err) {
                    return reply(err);
                }
                return reply('Successfully logged out').code(200);
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'jwt-auth-signout'
};