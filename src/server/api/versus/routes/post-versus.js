const schemaCreateResponse = require('../schemas/createResponse');
const versus               = require('../models/versus');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/',
        config: {
            auth: options.auth,
            description: 'Create a versus game',
            notes: [
                'See the request parameters section for more information.',
                'You will need to authenticate against the server to create a versus game.',
                'Remember to join the game afterwards.'
            ],
            validate: {},
            response: {
                schema: schemaCreateResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.name;

            versus
                .create(groupId).then(msg => {
                    return reply({
                        gameId: msg.id
                    }).code(201);
                })
                .catch((err) => {
                    return reply(err);
                });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'versus-route-post-versus'
};