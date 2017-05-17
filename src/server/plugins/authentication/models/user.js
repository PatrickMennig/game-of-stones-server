const level  = require('level');
const bcyrpt = require('bcrypt');

const db      = level('./level/users');


<<<<<<< HEAD
// TODO only for testing, always creates root account
/*
db.put('1337', JSON.stringify({id: 1, username: '1337', password: bcyrpt.hashSync('1337', 10)}));
db.put('6975', JSON.stringify({id: 2, username: '6975', password: bcyrpt.hashSync('6975', 10)}));
db.put('6976', JSON.stringify({id: 3, username: '6976', password: bcyrpt.hashSync('6976', 10)}));
db.put('6977', JSON.stringify({id: 4, username: '6977', password: bcyrpt.hashSync('6977', 10)}));
db.put('6978', JSON.stringify({id: 5, username: '6978', password: bcyrpt.hashSync('6978', 10)}));
db.put('6979', JSON.stringify({id: 6, username: '6979', password: bcyrpt.hashSync('6979', 10)}));
db.put('6985', JSON.stringify({id: 7, username: '6985', password: bcyrpt.hashSync('6985', 10)}));
db.put('6987', JSON.stringify({id: 8, username: '6987', password: bcyrpt.hashSync('6987', 10)}));
db.put('6988', JSON.stringify({id: 9, username: '6988', password: bcyrpt.hashSync('6988', 10)}));
db.put('6992', JSON.stringify({id: 10, username: '6992', password: bcyrpt.hashSync('6992', 10)}));
db.put('6993', JSON.stringify({id: 11, username: '6993', password: bcyrpt.hashSync('6993', 10)}));
db.put('6996', JSON.stringify({id: 12, username: '6996', password: bcyrpt.hashSync('6996', 10)}));
db.put('6997', JSON.stringify({id: 13, username: '6997', password: bcyrpt.hashSync('6997', 10)}));
db.put('6999', JSON.stringify({id: 14, username: '6999', password: bcyrpt.hashSync('6999', 10)}));
db.put('7000', JSON.stringify({id: 15, username: '7000', password: bcyrpt.hashSync('7000', 10)}));
db.put('7001', JSON.stringify({id: 16, username: '7001', password: bcyrpt.hashSync('7001', 10)}));
db.put('7002', JSON.stringify({id: 16, username: '7002', password: bcyrpt.hashSync('7002', 10)}));
db.put('7003', JSON.stringify({id: 16, username: '7003', password: bcyrpt.hashSync('7003', 10)}));
db.put('7005', JSON.stringify({id: 16, username: '7005', password: bcyrpt.hashSync('7005', 10)}));
db.put('7007', JSON.stringify({id: 16, username: '7007', password: bcyrpt.hashSync('7007', 10)}));
db.put('7009', JSON.stringify({id: 16, username: '7009', password: bcyrpt.hashSync('7009', 10)}));
db.put('7010', JSON.stringify({id: 16, username: '7010', password: bcyrpt.hashSync('7010', 10)}));
db.put('7011', JSON.stringify({id: 16, username: '7011', password: bcyrpt.hashSync('7011', 10)}));
db.put('7020', JSON.stringify({id: 16, username: '7020', password: bcyrpt.hashSync('7020', 10)}));
db.put('7023', JSON.stringify({id: 16, username: '7023', password: bcyrpt.hashSync('7023', 10)}));
db.put('7024', JSON.stringify({id: 16, username: '7024', password: bcyrpt.hashSync('7024', 10)}));
db.put('7039', JSON.stringify({id: 16, username: '7039', password: bcyrpt.hashSync('7039', 10)}));
db.put('7331', JSON.stringify({id: 16, username: '7331', password: bcyrpt.hashSync('7331', 10)}));
*/
=======

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


>>>>>>> bdb57928a231a3feb060f22ff12871804a8722e5

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
