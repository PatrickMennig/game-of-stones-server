const schemaTurn         = require('../schemas/turn');
const schemaTurnResponse = require('../schemas/turnResponse');
const Boom               = require('boom');
const botgame            = require('../models/botgame');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameId}/turn',
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
                payload: schemaTurn
            },
            response: {
                schema: schemaTurnResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.name;
            const gameId = request.params.gameId;
            const turn = request.payload;

            botgame
                .move(gameId, groupId, turn)
                .then(msg => {
                    const { id, game, payload } = msg;
                    return reply({
                        gameId: id,
                        activePlayer: payload.activePlayer,
                        boardState: payload.boardState,
                        state: payload.state,
                        timeStarted: payload.timeStarted,
                        timeLastTurnPlayed: payload.timeLastTurnPlayed,
                        turnsTaken: payload.turnsTaken
                    });
                }).catch(err => {
                    return reply(err);
                });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-post-botgame-id-turn'
};