const Boom = require('boom');

const Api      = require('../../../../logic/api/Api');
const MemStore = require('./../utils/MemStore');
const memStore = new MemStore();
const DBStore  = require('./../utils/DBStore');
const dbStore  = new DBStore();


exports.getAllFinished = () => {
    return Promise.resolve().then(() => dbStore.getAll());
};

exports.getAllRunning = () => {
    return Promise.resolve().then(() => memStore.getAll());
};

exports.create = (groupId) => {
    return new Promise((resolve, reject) => {

        let msg;

        try {
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
};

exports.move = (gameId, groupId, turn) => {
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
                return resolve(msg);
            })
            .catch(err => {
                return reject(Boom.create(400, err.message));
            });
    });

};

exports.finish = (id) => {
    return new Promise((resolve, reject) => {

    });
};


const isBot = (playerId) => playerId.match("^bot_");

const moveBot = (game) => {
    return Promise.resolve().then(() => {

        const bot = game.getActivePlayer();

        //todo use ai here
        const turn = {
            toId: 1
        };

        try {
            return Api.resolveMove(game, bot.getPlayerId(), turn);
        } catch (e) {
            throw Boom.create(400, e.message);
        }
    });
};
