const level  = require('level');
const bcyrpt = require('bcrypt');

const DB_NAME = './users';
const db      = level(DB_NAME);


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


exports.validatePassword = (id, password, callback) => {

    db.get(id, (err, user) => {

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