const Hapi           = require('hapi');
const Authentication = require('./plugins/authentication/authentication');
const Docs           = require('./plugins/docs/docs');


const server = new Hapi.Server({
    connections: {
        compression: true,
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        }
    }
});


server.connection({
    port: 3000,
    host: 'localhost'
});


const onRegister = (err) => {
    if (err) {
        throw err;
    }
};


server.register(
    {
        register: Authentication,
        options: {
            secret: 'verycoolsecret'
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