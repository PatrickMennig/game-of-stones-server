const schemaTurn         = require('../schemas/turn');
const schemaTurnResponse = require('../schemas/turnResponse');
const Boom               = require('boom');
const versus             = require('../models/versus');
const events             = require('../utils/events');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameId}/turn',
        config: {
            auth: options.auth,
            description: 'Play a turn in a botgame',
            notes: [
                'You can only play a turn in a versus game that was previously joined by your group.',
                'Playing turns in versu games when you are not the active player is impossible.',
                'Supplying an invalid turn will result in a loss for your group.',
                'You will need to authenticate against the server to play a turn.'
            ],
            validate: {
                payload: schemaTurn
            },
            response: {
                schema: schemaTurnResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.username;
            const gameId  = request.params.gameId;
            const turn    = request.payload;

            versus
                .move(gameId, groupId, turn)
                .then(msg => {

                    return new Promise((resolve, reject) => {
                        events.bus().emit(events.eventName(gameId, events.eventTypes.turn), msg);

                        events.bus().once(events.eventName(gameId, events.eventTypes.waitForTurn), (msg) => {
                            resolve(msg);
                        });
                    });
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
                    }).code(201);
                }).catch(err => {
                return reply(err);
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'versus-route-post-versus-id-turn'
};