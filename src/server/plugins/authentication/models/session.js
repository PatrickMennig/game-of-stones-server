const level = require('level');

const db      = level('./level/sessions');


exports.putSession = (username, obj, callback) => {

    db.put(username, obj, (err) => {
        if (err) {
            return callback(err);
        }
        return callback(null, {sessionId: username, obj: obj});
    });
};


exports.getSession = (username, callback) => {
    db.get(username, (err, value) => {
        if (err) {
            return callback(err);
        }
        return callback(null, {sessionId: username, obj: value});
    });
};


exports.delSession = (username, callback) => {

    db.get(username, (err, value) => {

        if (err) {
            return callback(new Error('Cannot delete session, key not stored.'));
        }

        db.del(username, (err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, {sessionId: username, obj: null});
        });

    });
};