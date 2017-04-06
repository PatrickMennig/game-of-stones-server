/**
 * This class is a reusable (and extendable) store object
 * that allows you to hold objects in memory.
 *
 * You can directly instantiate and use it or extend it to your needs.
 * It supports adding, removing, getting of elements as
 * well as getting an interator of all elements stored.
 */

class Store {

    constructor() {
        this._store = new Map();
    }

    get(id) {
        if(true !== this._store.has(id)) {
            throw new Error(`Cannot get: ${id}, value was never set.`);
        }
        return this._store.get(id);
    }

    put(id, obj) {
        if(this._store.has(id)) {
            throw new Error(`Cannot put: ${id}, duplicate key.`);
        }
        this._store.set(id, obj);
        return obj;
    }

    remove(id) {
        if(true !== this._store.has(id)) {
            throw new Error(`Cannot remove: ${id}, value was never set.`);
        }
        return this._store.delete(id);
    }

    entries() {
        return this._store.entries();
    }
}

module.exports = Store;