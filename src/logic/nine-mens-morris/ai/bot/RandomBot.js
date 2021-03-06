const Player      = require('../../game/Player').Player;
const moveFactory = require('../../game/Move');
const Rules       = require('../../rules/Rules');
const enumPhases  = require('../../game/enum/enumPhases');


const MAX_TRIES = 10000;


class RandomBot extends Player {

    getNextMove(board, otherPlayer) {
        const randomMove = this._randomMove(board, otherPlayer);
        this.setNextMove(randomMove);
        return super.getNextMove();
    }

    _randomMove(board, otherPlayer) {
        const p = this.getPhase();
        switch (p) {
            case enumPhases.PHASE_1_PLACING:
                return this._placingMove(board, otherPlayer);
            case enumPhases.PHASE_2_MOVING:
                return this._movingMove(board, otherPlayer);
            case enumPhases.PHASE_3_FLYING:
                return this._flyingMove(board, otherPlayer);
        }
    }

    _placingMove(board, otherPlayer) {
        let move;
        let tries = 0;

        do {
            tries++;
            const toId       = RandomBot._randomWithChance(1);
            move             = moveFactory.createMove(this.getToken(), toId);
            const willBeMill = Rules.willBeMill(move, board);

            if (willBeMill) {

                for (let i = 0; i < 24; ++i) {
                    move          = moveFactory.createMove(this.getToken(), toId, null, i);
                    const isValid = Rules.isValid(move, board, this, otherPlayer).isValid;

                    if (isValid) {
                        return move;
                    }
                }
            }
        } while ((!move || true !== Rules.isValid(move, board, this, otherPlayer).isValid ) && tries < MAX_TRIES);

        return move;
    }

    _movingMove(board, otherPlayer) {
        let move;
        let tries = 0;

        do {
            tries++;
            const fromId = RandomBot._randomWithChance(1);

            if (!board.getPosition(fromId).isOwnToken(this.getToken())) {
                continue;
            }

            const toIds = board.getPosition(fromId).getNeighbors().filter(n => n.isEmpty());

            if (toIds.length === 0) {
                continue;
            }

            const toId = toIds[RandomBot._randomUpExcl(toIds.length)].getId();

            move             = moveFactory.createMove(this.getToken(), toId, fromId);
            const willBeMill = Rules.willBeMill(move, board);

            for (let runs = 0; willBeMill && runs < 50; ++runs) {

                const removeId = RandomBot._randomWithChance(1);
                move           = moveFactory.createMove(this.getToken(), toId, fromId, removeId);

                const isValid = Rules.isValid(move, board, this, otherPlayer).isValid;

                if (isValid) {
                    return move;
                }
            }
        } while ((!move || true !== Rules.isValid(move, board, this, otherPlayer).isValid) && tries < MAX_TRIES);

        return move;
    }

    _flyingMove(board, otherPlayer) {
        let move;
        let tries = 0;

        do {
            tries++;
            const toId       = RandomBot._randomWithChance(1);
            const fromId     = RandomBot._randomWithChance(1);
            move             = moveFactory.createMove(this.getToken(), toId, fromId);
            const willBeMill = Rules.willBeMill(move, board);

            if (willBeMill) {
                for (let i = 0; i < 24; ++i) {
                    move          = moveFactory.createMove(this.getToken(), toId, fromId, i);
                    const isValid = Rules.isValid(move, board, this, otherPlayer).isValid;

                    if (isValid) {
                        return move;
                    }
                }
            }
        } while ((!move || true !== Rules.isValid(move, board, this, otherPlayer).isValid) && tries < MAX_TRIES);

        return move;
    }


    static create() {
        return new RandomBot(Player.nextBotPlayerId(), Player.playerTypeBot());
    }


    static _randomWithChance(chance) {
        const res = Math.random();
        if (res < chance) {
            return Math.floor(Math.random() * 23);
        }
        return null;
    }

    static _randomUpExcl(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = RandomBot;
