const schemaGroupId        = require('../schemas/groupId');
const schemaCreateResponse = require('../schemas/createResponse');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/',
        config: {
            auth: options.auth,
            description: 'Create a botgame',
            notes: [
                'See the request parameters section for more information.',
                'You will need to authenticate against the server to create a botgame.'
            ],
            validate: {
                payload: {
                    groupid: schemaGroupId
                }
            },
            response: {
                schema: schemaCreateResponse
            }
        },
        handler: (request, reply) => {
            return reply({gameid: 'not a real game id'})
        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame'
};