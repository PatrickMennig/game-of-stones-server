const level  = require('level');
const bcyrpt = require('bcrypt');

const db      = level('./level/users');


// TODO only for testing, always creates root account
db.put('root', JSON.stringify({id: 0, username: 'root', password: bcyrpt.hashSync('root', 10)}));


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