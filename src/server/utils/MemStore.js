class MemStore {

    constructor() {
        this._store = new Map();
    }


    get(id) {
        return new Promise((resolve, reject) => {
            if (true !== this._store.has(id)) {
                return reject(new Error('GameId unknown to server store.'));
            }
            return resolve(this._store.get(id));
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            return resolve([...this._store.entries()].map(kv => kv[1]));
        });
    }

    put(id, obj) {
        return new Promise((resolve, reject) => {
            this._store.set(id, obj);
            return resolve(obj);
        });
    }

    del(id) {
        return new Promise((resolve, reject) => {
            if (true !== this._store.has(id)) {
                return reject(new Error('GameId unknown to server store.'));
            }
            return resolve(this._store.delete(id));
        });
    }

}

module.exports = MemStore;