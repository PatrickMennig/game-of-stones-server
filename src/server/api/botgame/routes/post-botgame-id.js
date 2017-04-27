const schemaTurnResponse = require('../schemas/turnResponse');
const Boom               = require('boom');
const botgame            = require('../models/botgame');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameId}',
        config: {
            auth: options.auth,
            description: 'Join a botgame',
            notes: [
                'You can only join a botgame that was previously created for your group.',
                'Joining botgames that you already joined is impossible.',
                'You will need to authenticate against the server to join a botgame.'
            ],
            validate: {
                //payload: {
                //    groupid: schemaGroupId
                //}
            },
            response: {
                schema: schemaTurnResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.name;
            const gameId = request.params.gameId;

            botgame
                .join(gameId, groupId)
                .then(msg => {
                    const {id} = msg;
                    return botgame.start(id);
                })
                .then(msg => {
                    const {id, game, payload} = msg;
                    return reply({
                        gameId: id,
                        activePlayer: payload.activePlayer,
                        boardState: payload.boardState,
                        state: payload.state,
                        timeStarted: payload.timeStarted,
                        timeLastTurnPlayed: payload.timeLastTurnPlayed,
                        turnsTaken: payload.turnsTaken
                    });
                })
                .catch(err => reply(err));
        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame-id'
};