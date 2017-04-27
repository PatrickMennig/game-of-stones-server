const schemaCreateResponse = require('../schemas/createResponse');
const botgame              = require('../models/botgame');


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
                //payload: {
                //    groupid: schemaGroupId
                //}
            },
            response: {
                schema: schemaCreateResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.name;

            botgame
                .create(groupId).then(msg => {
                    return reply({
                        gameId: msg.id
                    });
                })
                .catch((err) =>{
                    return reply(err);
                });

        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame'
};