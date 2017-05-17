const signin  = require('./routes/signin');
const signout = require('./routes/signout');
const update  = require('./routes/updateCredentials');
const user    = require('./models/user');

const validateSession     = require('./utils/validateSession');
const validateCredentials = require('./utils/validateCredentials');
const createToken         = require('./utils/createToken');

const STRATEGY   = 'jwt';
const ALGORITHM  = 'HS256';
const EXPIRATION = 60 * 60 * 42;    // one day


exports.register = (server, options, next) => {

    if (!options.hasOwnProperty('secret')) {
        throw new Error('Secret has to be passed to authentication plugin.');
    }

    if (options.hasOwnProperty('defaultUsers') && options.defaultUsers !== false) {
        require('fs').readFile(options.defaultUsers, (err, data) => {
            const users = JSON.parse(data);
            user.createDefaultUsers(users);
        });
    }

    createToken.init(options.secret, ALGORITHM, EXPIRATION);

    server.register(require('hapi-auth-jwt2'), (err) => {

        if (err) {
            throw err;
        }

        server.auth.strategy(STRATEGY, STRATEGY, {
            key: options.secret,
            validateFunc: validateSession,
            verifyOptions: {algorithms: [ALGORITHM]}
        });

        server.auth.default('jwt');
    });

    server.register(require('hapi-auth-basic'), (err) => {

        if (err) {
            throw err;
        }

        server.auth.strategy('basic', 'basic', {
            validateFunc: validateCredentials
        });

        server.register(signin, err => {
            if (err) {
                throw err;
            }
        });

        server.register(signout, err => {
            if (err) {
                throw err;
            }
        });

        server.register(update, err => {
            if (err) {
                throw err;
            }
        });

        next();
    });
};


exports.register.attributes = {
    name: 'jwt-auth',
    multiple: false
};


exports.strategy = STRATEGY;