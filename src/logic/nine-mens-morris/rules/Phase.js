const enumPhases = require('./enum/enumPhases');


class Phase {

    constructor(player) {
        this._phase = Phase._determinePhase(player);
    }

    getPhase() {
        return this._phase;
    }

    phases() {
        return enumPhases;
    }

    static _determinePhase(player) {
        if (player.getNumTokensInHand() > 0 && player.getNumTokensTotal() > 3) {
            return enumPhases.PHASE_1_PLACING;
        }
        if (player.getNumTokensInHand() === 0 && player.getNumTokensTotal() > 3) {
            return enumPhases.PHASE_2_MOVING;
        }
        if (player.getNumTokensTotal() === 3) {
            return enumPhases.PHASE_3_FLYING;
        }
        throw new Error('Internal error, undefined state for player phase, unable to resolve to a correct phase.');
    }

}


exports.createPhase = (player) => new Phase(player);