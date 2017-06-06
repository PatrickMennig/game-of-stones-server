const schemaTurnResponse = require('../schemas/turnResponse');
const Boom               = require('boom');
const versus             = require('../models/versus');
const events             = require('../utils/events');


exports.register = (server, options, next) => {

    server.route({
        method: 'POST',
        path: '/{gameId}',
        config: {
            auth: options.auth,
            description: 'Join a botgame',
            notes: [
                'You can only join a versus game that was previously created.',
                'Joining versus games that you already joined is impossible.',
                'You will need to authenticate against the server to join a versus game.'
            ],
            validate: {},
            response: {
                schema: schemaTurnResponse
            }
        },
        handler: (request, reply) => {

            const groupId = request.auth.credentials.username;
            const gameId  = request.params.gameId;

            versus
                .join(gameId, groupId)
                .then(msg => {

                    return new Promise((resolve, reject) => {

                        const {id, payload} = msg;

                        if (versus.isReady(payload.state)) {
                            // both players have joined
                            const msg = versus.start(id);
                            events.bus().emit(events.eventName(gameId, events.eventTypes.waitForJoin), msg);
                            resolve(msg);
                        }

                        if (true !== versus.isReady(payload.state)) {
                            // other player has not yet joined, i.e. this is the first joiner
                            events.bus().once(events.eventName(gameId, events.eventTypes.waitForJoin), (msg) => {
                                // now both players have joined
                                resolve(msg);
                            });
                        }
                    });
                })
                .then(msg => {

                    return new Promise((resolve, reject) => {

                        // game is started and msg contains the info who goes first
                        const {payload} = msg;

                        if (payload.activePlayer === groupId) {
                            // resolve directly and answer with the empty board, this player has to make a turn
                            resolve(msg);
                        }

                        if (payload.inactivePlayer === groupId) {
                            // wait until other player made his turn
                            events.bus().once(events.eventName(gameId, events.eventTypes.waitForTurn), (msg) => {
                                resolve(msg);
                            });
                        }
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
                    });
                })
                .catch(err => reply(err));
        }
    });

    next();
};

exports.register.attributes = {
    name: 'versus-route-post-versus-id'
};


