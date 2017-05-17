const level  = require('level');
const bcyrpt = require('bcrypt');

const db      = level('./level/users');



exports.createDefaultUsers = (users) => {
    users.forEach(u => {
        if(!u.username || !u.password) {
            throw new Error('Error when creating default users on startup. Missing key or value.');
        }
        db.put(u.username, JSON.stringify({
            username: u.username,
            password: bcyrpt.hashSync(u.password, 10),
            admin: u.admin || false
        }));
    })
};



exports.getUser = (id, callback) => {

    db.get(id, (err, user) => {

        if (err) {
            return callback(err);
        }

        delete user.password;
        return callback(null, user);
    });
};


exports.validatePassword = (username, password, callback) => {

    db.get(username, (err, user) => {

        if (err && err.name !== 'NotFoundError') {
            return callback(err);
        }

        if(err && err.name === 'NotFoundError') {
            return callback(null, false);
        }

        user = JSON.parse(user);

        const isCorrectPassword = bcyrpt.compareSync(password, user.password);

        if (!isCorrectPassword) {
            return callback(null, false);
        }

        delete user.password;
        return callback(null, user);
    });
};


exports.changePassword = (username, newPassword, callback) => {

    db.get(username, (err, user) => {

        if (err) {
            return callback(err);
        }

        user = JSON.parse(user);

        db.put(user.username, JSON.stringify({id: user.id, username: user.username, password: bcyrpt.hashSync(newPassword, 10)}));

        delete user.password;
        return callback(null, user);
    });

};