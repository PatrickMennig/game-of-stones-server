const sessions = require('../models/session');


module.exports = (decoded, callback) => {
    sessions.delSession(decoded.username, (err, session) => {
        if(err) {
            return callback(err, false);
        }
        return callback(null, true);
    });
};