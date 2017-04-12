const user = require('../models/user');


module.exports = (request, username, password, callback) => {

    user.validatePassword(username, password, (err, user) => {

        if(err) {
            return callback(err, false);
        }

        if(!user) {
            return callback(null, false);
        }

        return callback(null, true, {user: user});
    });
};