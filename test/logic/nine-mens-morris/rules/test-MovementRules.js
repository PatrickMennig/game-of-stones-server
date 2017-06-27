const assert        = require('assert');
const moveFactory   = require('../../../../src/logic/nine-mens-morris/game/Move');
const boardFactory  = require('../../../../src/logic/nine-mens-morris/game/Board');
const playerFactory = require('../../../../src/logic/nine-mens-morris/game/Player');
const MovementRules = require('../../../../src/logic/nine-mens-morris/rules/MovementRules');

const PLAYER_ONE_TOKEN = 'a12345';
const PLAYER_TWO_TOKEN = 'b67890';


describe('MovementRules', function () {

    describe('isValidMove', function () {

        it('should be a valid move, placing a token on an empty field', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 3},
                {token: p1.getToken(), id: 5},
                {token: p2.getToken(), id: 7},
                {token: p1.getToken(), id: 11},
                {token: p2.getToken(), id: 23}
            ]);

            for(let i = 0; i < 3; ++i) {
                p1.placedToken();
                p2.placedToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 2);
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, true);
        });


        it('should be a valid move, moving a token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 13},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 15},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 2; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 4, 1);
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, true);
        });


        it('should be a valid move, moving a token (slack test case)', function () {
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
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, true);
        });


        it('should be a valid move, flying a token', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p2.getToken(), 20, 2);
            const res = MovementRules.isValidMove(m, p2, b);

            assert.equal(res, true);
        });


        it('should not be a valid move, placing on occupied field', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p2.getToken(), id: 3},
                {token: p1.getToken(), id: 5},
                {token: p2.getToken(), id: 7},
                {token: p1.getToken(), id: 11},
                {token: p2.getToken(), id: 23}
            ]);

            for(let i = 0; i < 3; ++i) {
                p1.placedToken();
                p2.placedToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 11);
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, false);
        });


        it('should not be a valid move, moving on occupied field', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 13},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 15},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 2; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 2, 1);
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, false);
        });


        it('should not be a valid move, moving on not adjacent field', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 5},
                {token: p2.getToken(), id: 10},
                {token: p2.getToken(), id: 13},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 15},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 2; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p1.getToken(), 12, 1);
            const res = MovementRules.isValidMove(m, p1, b);

            assert.equal(res, false);
        });

        it('should not be a valid move, flying on occupied field', function () {
            const p1 = playerFactory.createBotPlayer();
            const p2 = playerFactory.createBotPlayer();

            const b = boardFactory.createBoardWithPattern([
                {token: p1.getToken(), id: 0},
                {token: p1.getToken(), id: 1},
                {token: p1.getToken(), id: 6},
                {token: p1.getToken(), id: 7},
                {token: p1.getToken(), id: 8},
                {token: p1.getToken(), id: 9},
                {token: p1.getToken(), id: 19},
                {token: p1.getToken(), id: 21},
                {token: p1.getToken(), id: 22},

                {token: p2.getToken(), id: 2},
                {token: p2.getToken(), id: 14},
                {token: p2.getToken(), id: 18}
            ]);

            for(let i = 0; i < 9; ++i) {
                p1.placedToken();
                p2.placedToken();
            }

            for(let i = 0; i < 6; ++i) {
                p2.lostToken();
            }


            const m = moveFactory.createMove(p2.getToken(), 14, 2);
            const res = MovementRules.isValidMove(m, p2, b);

            assert.equal(res, false);
        });

    });

});