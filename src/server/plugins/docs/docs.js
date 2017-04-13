exports.register = (server, options, next) => {

    const onRegister = (err) => {
        if (err) {
            throw err;
        }
    };

    server.register(require('vision'), onRegister);
    server.register(require('inert'), onRegister);
    server.register(require('lout'), onRegister);

    next();
};

exports.register.attributes = {
    name: 'docs',
    multiple: false
};