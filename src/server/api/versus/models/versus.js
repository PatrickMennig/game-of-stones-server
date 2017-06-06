const Boom = require('boom');

const Api      = require('../../../../logic/api/Api');
const MemStore = require('./../../../utils/MemStore');
const memStore = new MemStore();
const DBStore  = require('./../../../utils/DBStore');
const dbStore  = new DBStore();


exports.getAllFinished = () => {
    return dbStore.getAll();
};


exports.getAllRunning = () => {
    return Promise.resolve().then(() => memStore.getAll());
};


exports.create = (groupId) => {
    return new Promise((resolve, reject) => {

        let msg;

        try {
            // TODO: versus game
            msg = Api.botGame(groupId);
        } catch (e) {
            return reject(Boom.create(400, e.message));
        }

        const {id, game} = msg;

        memStore
            .put(id, game)
            .then(game => {
                resolve(msg);
            })
            .catch(err => {
                reject(Boom.create(400, err.message));
            });
    });

};


exports.join = (gameId, groupId) => {
    // TODO: rework for versus
    /*
    return new Promise((resolve, reject) => {
        memStore
            .get(gameId)
            .then(game => {
                return resolve(Api.joinGame(game, groupId));
            })
            .catch(err => {
                return reject(Boom.create(400, err.message));
            });
    });
    */
};


exports.start = (gameId) => {
    // TODO: rework for versus
    /*
    return new Promise((resolve, reject) => {
        memStore
            .get(gameId)
            .then(game => {
                return Api.startGame(game)
            })
            .then(msg => {

                if (isBot(msg.payload.activePlayer)) {
                    return moveBot(msg.game);
                }

                return msg;
            })
            .then(msg => {
                return resolve(msg);
            })
            .catch(err => {
                return reject(Boom.create(400, err.message));
            });
    });
    */
};


exports.move = (gameId, groupId, turn) => {
    // TODO: rework for versus
    /*
    return new Promise((resolve, reject) => {
        memStore
            .get(gameId)
            .then(game => {
                return Api.resolveMove(game, groupId, turn);
            })
            .then(msg => {
                if (isBot(msg.payload.activePlayer)) {
                    return moveBot(msg.game);
                }

                return msg;
            })
            .then(msg => {
                if(true !== Api.isRunning(msg.payload.state)) {
                    finish(msg.id, msg.game);
                    return resolve(msg);
                }
                return resolve(msg);
            })
            .catch(err => {
                return reject(Boom.create(400, err.message));
            });
    });
    */
};


const finish = (id, game) => {
    // TODO: rework for versus
    /*
    dbStore.put(id, game.getStatusMessage())
        .then(msg => {
            console.log('[Server Botgame]   Saved botgame to database.');
        })
        .then(() => memStore.del(id))
        .catch(err => {
            console.error('[Server Botgame]   Error saving botgame to database.');
            console.error(err);
        });
    */
};
