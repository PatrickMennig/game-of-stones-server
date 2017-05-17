const Hapi           = require('hapi');
const Authentication = require('./plugins/authentication/authentication');
const Docs           = require('./plugins/docs/docs');

const config              = require('./config');
const defaultAccountsFile = require('path').join(__dirname, 'default_users.json');


const server = new Hapi.Server(config.server.routeConfig);
server.connection(config.server.connection);


const onRegister = (err) => {
    if (err) {
        throw err;
    }
};



if(config.authentication.createDefaultUsers) {

    console.warn('Creating default users in 10 seconds... this will overwrite exisiting users with the same usernames.');
    setTimeout(() => console.warn('Creating default users in  5 seconds... this will overwrite exisiting users with the same usernames.'), 5000);
    setTimeout(setup, 10000);

} else {
    setup();
}






function setup () {

    server.register(
        {
            register: Authentication,
            options: {
                secret: config.authentication.secret,
                defaultUsers: config.authentication.createDefaultUsers && defaultAccountsFile
            }
        },
        onRegister
    );


    server.register(
        {
            register: require('./api/botgame/botgame'),
            options: {
                auth: Authentication.strategy,
                dependencies: ['jwt-auth']
            }
        },
        {
            routes: {
                prefix: '/botgame'
            }
        },
        onRegister
    );


    server.register(Docs, onRegister);


    server.start(err => {
        if (err) {
            throw err;
        }
        console.info(`[API-Server] Server running at ${server.info.uri}`);
    });
};

