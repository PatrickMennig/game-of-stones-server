const botgame = require('../models/botgame');


exports.register = (server, options, next) => {

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
        handler: (request, reply) => {

            Promise
                .all([botgame.getAllFinished(), botgame.getAllRunning()])
                .then(games => reply([...games[0], ...games[1]]))
                .catch(err => reply(err.message).status(500));

        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-get-botgames'
};