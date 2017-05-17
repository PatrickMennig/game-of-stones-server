module.exports = {

    server: {

        connection: {
            port: 3000,                             // <-- make sure the firewall is properly configured
            host: 'localhost'                       // <-- has to be set to the url the server should listen to
        },

        routeConfig: {
            connections: {
                compression: true,
                router: {
                    isCaseSensitive: false,
                    stripTrailingSlash: true
                }
            }
        }
    },

    authentication: {
        secret: 'verycoolsecret',                   // <-- change this to something very random and keep is secret
        createDefaultUsers: false                   // <-- will use default_users.json to create users, might overwrite
                                                    //     existing users and hence will delay server start by 10 seconds
    }

};