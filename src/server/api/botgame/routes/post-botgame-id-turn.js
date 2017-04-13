const schemaGameId       = require('../schemas/gameId');
const schemaGroupId      = require('../schemas/groupId');
const schemaTurn         = require('../schemas/turn');
const schemaTurnResponse = require('../schemas/turnResponse');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameid}/turn',
        config: {
            auth: options.auth,
            description: 'Play a turn in a botgame',
            notes: [
                'You can only play a turn in a botgame that was previously joined by your group.',
                'Playing turns in botgames when you are not the active player is impossible.',
                'Supplying an invalid turn will result in a loss for your group.',
                'You will need to authenticate against the server to join a botgame.'
            ],
            validate: {
                payload: {
                    groupid: schemaGroupId,
                    gameid: schemaGameId,
                    turn: schemaTurn
                }
            },
            response: {
                schema: schemaTurnResponse
            }
        },
        handler: (request, reply) => reply('Play a turn in a botgame')
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame-id-turn'
};