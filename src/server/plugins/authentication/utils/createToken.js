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

    let scopes;

    if (user.admin) {
        scopes = 'admin';
    }

    return jwt.sign({id: user.id, name: user.username, scope: scopes}, secret, {algorithm: algorithm, expiresIn: expiration});
};