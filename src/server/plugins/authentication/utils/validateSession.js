const sessions = require('../models/session');


module.exports = (decoded, request, callback) => {

    sessions.getSession(decoded.id, (err, session) => {
        if(err) {
            return callback(null, false);
        }

        // TODO: include check for expiration

        return callback(null, true);
    });
};
