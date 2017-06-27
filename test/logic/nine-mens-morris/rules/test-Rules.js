const assert        = require('assert');
const Rules         = require('../../../../src/logic/nine-mens-morris/rules/Rules');
const boardFactory  = require('../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory   = require('../../../../src/logic/nine-mens-morris/game/Move');
const playerFactory = require('../../../../src/logic/nine-mens-morris/game/Player');


describe('Rules', function () {

    describe('isValidMove', function () {

        it('should be a valid move, not a winning one, not closing a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 3},
                {token: p1.getToken(), id: 4},
                {token: p1.getToken(), id: 10},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 23},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 6},
                {token: p2.getToken(), id: 7},
                {token: p2.getToken(), id: 11},
                {token: p2.getToken(), id: 12},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 15},
                {token: p2.getToken(), id: 19}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 2; ++i) {
                p1.lostToken();
            }

            for(let i = 0; i < 1; ++i) {
                p2.lostToken();
            }

            const m = moveFactory.createMove(p1.getToken(), 9, 0);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, true);
        });

        it('should be a valid move, not a winning one, closing a mill');

        it('should be a valid move, moving, a winning one, closing a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 17},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 16, 17, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, true);
        });


        it('should be a valid move, moving, a winning one, closing a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 17},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 16, 17, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.endsGame, true);
        });


        it('should be a valid move, flying, a winning one, closing a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p1.lostToken();
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 8, 0, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, true);
        });

        it('should be a valid move, flying, a winning one, closing a mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p1.lostToken();
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 8, 0, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.endsGame, true);
        });


        it('should not be a valid move, not moving your own token');

        it('should not be a valid move, from-field does not contain your own token');

        it('should not be a valid move for phase 1, to-field is occupied');

        it('should not be a valid move for phase 2, no from-field supplied');

        it('should not be a valid move for phase 2, not moving own token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 4},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 11},
                {token: p1.getToken(), id: 12},
                {token: p1.getToken(), id: 13},
                {token: p1.getToken(), id: 17},
                {token: p1.getToken(), id: 19},

                {token: p2.getToken(), id: 1},
                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 8},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 18},
                {token: p2.getToken(), id: 20},
                {token: p2.getToken(), id: 21},
                {token: p2.getToken(), id: 22}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            const m = moveFactory.createMove(p2.getToken(), 9, 0, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, false);
        });

        it('should not be a valid move for phase 2, fields from and to are not adjacent');

        it('should not be a valid move for phase 2, to field is occupied');

        it('should not be a valid move for phase 3, to field is occupied');

        it('should not be a valid move, not closing a mill but passing remove id', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 4},
                {token: p1.getToken(), id: 5},
                {token: p1.getToken(), id: 14},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 3},
                {token: p2.getToken(), id: 6},
                {token: p2.getToken(), id: 7},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 11},
                {token: p2.getToken(), id: 17},
                {token: p2.getToken(), id: 20}
            ]);

            for(let i = 0; i < 6; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            p2.placedToken();

            const m = moveFactory.createMove(p1.getToken(), 21, null, 1);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, false);
        });

        it('should not be a valid move, closing a mill but removal is invalid, token to remove in mill', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 4},
                {token: p1.getToken(), id: 5},
                {token: p1.getToken(), id: 14},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 3},
                {token: p2.getToken(), id: 6},
                {token: p2.getToken(), id: 7},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 11},
                {token: p2.getToken(), id: 15},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 6; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            p2.placedToken();

            const m = moveFactory.createMove(p1.getToken(), 1, null, 10);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, false);
        });

        it('should not be a valid move, closing a mill but removal is invalid, no token there', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 2},
                {token: p1.getToken(), id: 4},
                {token: p1.getToken(), id: 5},
                {token: p1.getToken(), id: 14},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 3},
                {token: p2.getToken(), id: 6},
                {token: p2.getToken(), id: 7},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 11},
                {token: p2.getToken(), id: 17},
                {token: p2.getToken(), id: 20}
            ]);

            for(let i = 0; i < 6; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            p2.placedToken();

            const m = moveFactory.createMove(p1.getToken(), 1, null, 21);
            const res = Rules.isValid(m, b, p1, p2);

            assert.equal(res.isValid, false);
        });

        it('should not be a valid move, closing a mill but other player has not enough tokens on the board');

    });

});