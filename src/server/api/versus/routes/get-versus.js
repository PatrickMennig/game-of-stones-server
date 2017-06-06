const versus = require('../models/versus');
const gamesResponseSchema = require('../schemas/gamesResponse');


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            description: 'List of all running botgames',
            notes: [
                'Use this route to see a list of all currently running versus games.'
            ],
            response: {
                schema: gamesResponseSchema
            }
        },
        handler: (request, reply) => {

            const running = versus.getAllRunning().then((games = []) => games.map(g => g.getStatusMessage()));
            const finished = versus.getAllFinished().then((games = []) => games.map(g => g._meta));

            const all = Promise.all([running, finished])
                .then(games => {
                    return [].concat.apply([], games);
                })
                .then(games => reply(games))
                .catch(err => reply(err.message).code(500));
        }
    });

    next();
};

exports.register.attributes = {
    name: 'versus-route-get-versus'
};