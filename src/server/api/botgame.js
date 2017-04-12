const Joi = require('joi');


exports.register = (server, options, next) => {

    const optCheck = isOptionsOk(options);
    if (optCheck.isOk === false) {
        throw optCheck.err;
    }

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            description: 'List of all running botgames',
            notes: [
                'Use this route to see a list of all botgames.',
                'This will do a database lookup and return all ids of all bot games known to the server.'
            ]
        },
        handler: (request, reply) => reply('List of all running botgames')
    });

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
                    groupid: validation.groupid
                }
            },
            response: {
                schema: Joi.object().keys({
                    gameid: validation.gameid
                })
            }
        },
        handler: (request, reply) => {
            return reply({gameid: 'not a real game id'})
        }
    });

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
                    groupid: validation.groupid,
                    gameid: validation.gameid
                }
            },
            response: {
                schema: Joi.object().keys({
                    gameid: validation.gameid,
                    activePlayerId: validation.groupid
                })
            }
        },
        handler: (request, reply) => reply('Join a botgame')
    });

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
                    groupid: validation.groupid,
                    gameid: validation.gameid,
                    turn: validation.turn
                }
            },
            response: {
                schema: Joi.object().keys({
                    gameid: validation.gameid,
                    activePlayerId: validation.groupid
                })
            }
        },
        handler: (request, reply) => reply('Play a turn in a botgame')
    });

    next();
};


exports.register.attributes = {
    name: 'botgame',
    multiple: false
};


const requiredOptions = {
    auth: 'auth'
};

const isOptionsOk = (options) => {
    if (!options.hasOwnProperty(requiredOptions.auth)) {
        return {
            isOk: false,
            err: new Error('Internal Error: Auth strategy is missing.')
        };
    }
    return true;
};

const validation = {
    gameid: Joi.any().required().description('The gameid has to be a valid gamid returned from the server.'),
    groupid: Joi.any().required().description('The groupid has to be a groupid known to the server.'),
    turn: Joi.object().required().keys({
        fromId: Joi.number().min(0).max(23),
        toId: Joi.number().min(0).max(23).required(),
        removeId: Joi.number().min(0).max(23)
    })
};