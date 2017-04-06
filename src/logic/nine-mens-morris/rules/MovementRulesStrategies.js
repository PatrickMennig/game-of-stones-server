class MRPhase {

    isValidMove() {
        throw new Error('Abstract method has to be implemented in subclass.');
    }

    _isOccupied(id, board) {
        return !board.getPosition(id).isEmpty();
    }
}


class MRPhaseOne extends MRPhase {

    isValidMove(move, board) {
        return ! this._isOccupied(move.getToId(), board);
    }

}


class MRPhaseTwo extends MRPhase {

    isValidMove(move, board) {
        if (false === move.getFromId()) {
            return false;
        }

        if (true !== board.isAdjacent(move.getFromId(), move.getToId())) {
            return false;
        }

        return ! this._isOccupied(move.getToId(), board);
    }

}


class MRPhaseThree extends MRPhase {

    isValidMove(move, board) {
        return ! this._isOccupied(move.getToId(), board);
    }

}


exports.strategyForPhase = (phase) => {
    const phases = phase.phases();
    switch (phase.getPhase()) {
        case phases.PHASE_1_PLACING:
            return new MRPhaseOne();
        case phases.PHASE_2_MOVING:
            return new MRPhaseTwo();
        case phase.PHASE_3_FLYING:
            return new MRPhaseThree();
        default:
            throw new Error('Unhandled phase in switch case - this should never happen!');
    }
};