const Hapi           = require('hapi');
const Authentication = require('./plugins/authentication/authentication');


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


server.register({register: Authentication, options: {secret: 'verycoolsecret'}}, (err) => {

    onRegister(err);

    server.register(
        {register: require('./api/botgame'), options: {auth: Authentication.strategy}},
        {routes: {prefix: '/botgame'}},
        onRegister
    );

    server.register(require('vision'), onRegister);
    server.register(require('inert'), onRegister);
    server.register(require('lout'), onRegister);

    server.start(err => {
        if (err) {
            throw err;
        }
        console.log(`Server running at ${server.info.uri}`);
    });

});

/*

 */








