const botgame = require('../models/botgame');
const gamesResponseSchema = require('../schemas/gamesResponse');


exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: false,
            description: 'List of all running botgames',
            notes: [
                'Use this route to see a list of all currently running botgames.',
                'This will do a database lookup and return all ids of all bot games known to the server.'
            ],
            response: {
                schema: gamesResponseSchema
            }
        },
        handler: (request, reply) => {

            const running = botgame.getAllRunning().then((games = []) => games.map(g => g.getStatusMessage()));
            const finished = botgame.getAllFinished().then((games = []) => games.map(g => g._meta));

            const all = Promise.all([running, finished]).then(games => {
                return [].concat.apply([], games);
            })
                .then(games => reply(games))
                .catch(err => reply(err.message).code(500));





            /*
                .then((games = []) => {
                    return games.concat( botgame.getAllFinished() )
                })
                .then(games => {
                    const res = games.map(g => g.getStatusMessage());

                })
                .catch(err =>
                    reply(err.message).code(500)
                );


            Promise
                .all([botgame.getAllFinished(), botgame.getAllRunning()])
                .then(games =>
                    reply( JSON.stringify([...games[0] , ...games[1] ]) ).header('Content-Type', 'application/json')
                )
                .catch(err => reply(err.message).status(500));
            */
        }
    });

    next();
};

exports.register.attributes = {
    name: 'botgame-route-get-botgames'
};