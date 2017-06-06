const EventEmitter = require('events').EventEmitter;
let messageBus;

exports.bus = () => {
    if(!messageBus) {
        messageBus = new EventEmitter();
    }
    return messageBus;
};

exports.eventName  = (id, type) => type + id;

exports.eventTypes = {
    waitForJoin: 'join-',
    joined: 'join-',
    waitForTurn: 'turn-',
    turn: 'turn-'
};