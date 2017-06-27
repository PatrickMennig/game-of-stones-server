module.exports = {

    server: {

        connection: {
            port: 3001,                             // <-- make sure the firewall is properly configured
            host: 'game-of-stones.de'               // <-- has to be set to the url the server should listen to
        },

        routeConfig: {
            connections: {
                compression: false,
                router: {
                    isCaseSensitive: false,
                    stripTrailingSlash: true
                }
            }
        }
    },

    authentication: {
        secret: '2ihjsdiohj0i8907q34hjknxycjuugh789924jsh',                   // <-- change this to something very random and keep is secret
        createDefaultUsers: false                   // <-- will use default_users.json to create users, might overwrite
                                                    //     existing users and hence will delay server start by 10 seconds
    }

};
