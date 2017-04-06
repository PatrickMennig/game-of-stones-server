


class RulesMessage {

    constructor() {
        this._isValid = false;
        this._endsGame = false;
        this._message = null;
    }

    setIsValid(value) {
        this._isValid = value;
    }

    setEndsGame(value) {
        this._endsGame = value;
    }

    setMessage(value) {
        if(typeof value !== 'string') {
            throw new TypeError('Internal error, message has to be of type string.');
        }
        this._message = value;
    }

    message() {
        return {
            isValid: this._isValid,
            endsGame: this._endsGame,
            message: this._message
        }
    }

}


exports.createMessage            = () => new RulesMessage();
exports.getMessageWithProperties = (isValid, message, endsGame =false) => {
    const m = new RulesMessage();
    m.setIsValid(isValid);
    m.setMessage(message);
    m.setEndsGame(endsGame);
    return m.message();
};