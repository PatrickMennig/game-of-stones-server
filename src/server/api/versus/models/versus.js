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
            msg = Api.versusGame(groupId);
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
};


exports.start = (gameId) => {
    return new Promise((resolve, reject) => {
        memStore
            .get(gameId)
            .then(game => {
                return Api.startGame(game)
            })
            .then(msg => {
                return resolve(msg);
            })
            .catch(err => {
                return reject(Boom.create(400, err.message));
            });
    });
};


exports.move = (gameId, groupId, turn) => {

    return new Promise((resolve, reject) => {
        memStore
            .get(gameId)
            .then(game => {
                return Api.resolveMove(game, groupId, turn);
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

};

exports.isReady = (state) => Api.isReady(state);


const finish = (id, game) => {

    dbStore.put(id, game.getStatusMessage())
        .then(msg => {
            console.log('[Server Versus]   Saved versus game to database.');
        })
        .then(() => memStore.del(id))
        .catch(err => {
            console.error('[Server Versus]   Error saving versus game to database.');
            console.error(err);
        });

};
