const level    = require('level');
const Pathwise = require('level-pathwise');
const db       = level('./level/botgames');
const store    = new Pathwise(db);


class DBStore {

    get(id) {
        return new Promise((resolve, reject) => {
            const query = !id ? [] : [id];
            store.get(query, (err, data) => {
                if (err) {
                    return reject(new Error('Key not found in database'));
                }
                return resolve(Object.keys(data).map(k => data[k]));
            });
        });
    }

    getAll() {
        return this.get();
    }

    put(id, obj) {
        return new Promise((resolve, reject) => {
            store.put([id], obj, (err, data) => {
                if (err) {
                    return reject(new Error('Unable to store object in database.'));
                }
                return resolve(data);
            });
        });
    }

    del(id) {
        return new Promise((resolve, reject) => {
            reject(new Error('Not yet implemented'));
        });
    }

}

module.exports = DBStore;