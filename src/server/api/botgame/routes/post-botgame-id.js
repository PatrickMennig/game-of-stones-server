const schemaGameId       = require('../schemas/gameId');
const schemaGroupId      = require('../schemas/groupId');
const schemaJoinResponse = require('../schemas/joinResponse');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameid}',
        config: {
            auth: options.auth,
            description: 'Join a botgame',
            notes: [
                'You can only join a botgame that was previously created for your group.',
                'Joining botgames that you already joined is impossible.',
                'You will need to authenticate against the server to join a botgame.'
            ],
            validate: {
                payload: {
                    groupid: schemaGroupId,
                    gameid: schemaGameId
                }
            },
            response: {
                schema: schemaJoinResponse
            }
        },
        handler: (request, reply) => reply('Join a botgame')
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame-id'
};