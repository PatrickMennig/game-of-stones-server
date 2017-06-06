exports.register = (server, options, next) => {

    const optCheck = isOptionsOk(options);

    if (optCheck.isOk === false) {
        throw optCheck.err;
    }


    server.dependency(options.dependencies, (server, next) => {

        server.register({register: require('./routes/get-botgames'), options: options}, onRegister);

        server.register({register: require('./routes/post-botgame'), options: options}, onRegister);

        server.register({register: require('./routes/post-botgame-id'), options: options}, onRegister);

        server.register({register: require('./routes/post-botgame-id-turn'), options: options}, onRegister);

        next();
    });
};


exports.register.attributes = {
    name: 'versus',
    multiple: false
};


const requiredOptions = {
    auth: 'auth',
    dependencies: 'dependencies'
};

const onRegister = (err) => {
    if (err) {
        throw err;
    }
};

const isOptionsOk = (options) => {
    if (!options.hasOwnProperty(requiredOptions.auth)) {
        return {
            isOk: false,
            err: new Error('Internal Error: Auth strategy is missing.')
        };
    }
    if (!Array.isArray(options[requiredOptions.dependencies])) {
        return {
            isOk: false,
            err: new Error('Internal Error: Dependencies array missing.')
        };
    }
    return {isOk: true};
};