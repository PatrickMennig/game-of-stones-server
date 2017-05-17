const jwt    = require('jsonwebtoken');

let secret;
let algorithm;
let expiration;


exports.init = (s, a, exp) => {
    secret = s;
    algorithm = a;
    expiration = exp;
};

exports.createToken = (user) => {

    if(!secret || !algorithm || !expiration) {
        throw new Error('Init create token prior to usage.');
    }

    let scopes = ['user'];

    if (user.admin) {
        scopes.push('admin');
    }

    return jwt.sign({username: user.username, scope: scopes}, secret, {algorithm: algorithm, expiresIn: expiration});
};