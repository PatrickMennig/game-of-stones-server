const assert             = require('assert');
const boardFactory       = require('../../../../src/logic/nine-mens-morris/game/Board');
const enumPositionTokens = require('../../../../src/logic/nine-mens-morris/game/enum/enumPositionTokens');

const PLAYER_TOKEN = 'player';


describe('Board', function () {

    describe('constructor', function () {

        it('should create a board', function () {
            const board = boardFactory.createBoard();
        });

    });

    describe('layout', function () {

        it('should correctly describe the 1st horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(0);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [0, 1, 2, 1, 0]);
        });

        it('should correctly describe the 2nd horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(3);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [3, 4, 5, 4, 3]);
        });

        it('should correctly describe the 3rd horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(6);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [6, 7, 8, 7, 6]);
        });

        it('should correctly describe the 4th horizontal row left ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(9);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [9, 10, 11, 10, 9]);
        });

        it('should correctly describe the 4th horizontal row right ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(12);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [12, 13, 14, 13, 12]);
        });

        it('should correctly describe the 5th horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(15);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [15, 16, 17, 16, 15]);
        });

        it('should correctly describe the 6th horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(18);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [18, 19, 20, 19, 18]);
        });

        it('should correctly describe the 7h horizontal row ->', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(21);
            const rowIds = [
                pos.getId(),
                pos.getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getId(),
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [21, 22, 23, 22, 21]);
        });


        it('should correctly describe the 1st vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(21);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [21, 9, 0, 9, 21]);
        });

        it('should correctly describe the 2nd vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(18);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [18, 10, 3, 10, 18]);
        });

        it('should correctly describe the 3rd vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(15);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [15, 11, 6, 11, 15]);
        });

        it('should correctly describe the 4th vertical row top ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(7);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [7, 4, 1, 4, 7]);
        });

        it('should correctly describe the 4th vertical row bottom ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(22);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [22, 19, 16, 19, 22]);
        });

        it('should correctly describe the 5th vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(17);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [17, 12, 8, 12, 17]);
        });

        it('should correctly describe the 6th vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(20);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [20, 13, 5, 13, 20]);
        });

        it('should correctly describe the 7h vertical row ^', function () {
            const board  = boardFactory.createBoard();
            const pos    = board.getPosition(23);
            const rowIds = [
                pos.getId(),
                pos.getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getId(),
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().getId()
            ];

            assert.deepEqual(rowIds, [23, 14, 2, 14, 23]);
        });

    });

    describe('resolve move', function () {

        it('should correctly resolve a placing move', function () {
            const board = boardFactory.createBoard();
            board.resolve(PLAYER_TOKEN, 1);
            const p = board.getPosition(1);
            assert.equal(PLAYER_TOKEN, p.getToken());
        });

        it('should correctly resolve a moving move', function () {
            const board = boardFactory.createBoard([{token: PLAYER_TOKEN, toId: 0}]);
            board.resolve(PLAYER_TOKEN, 1, 0);
            const t0 = board.getPosition(0).getToken();
            const t1 = board.getPosition(1).getToken();
            assert.deepEqual(
                {t0: enumPositionTokens.TOKEN_EMPTY, t1: PLAYER_TOKEN},
                {t0: t0, t1: t1}
            );
        });

        it('should correctly resolve a moving move with remove', function () {
            const board = boardFactory.createBoard([{token: PLAYER_TOKEN, toId: 0}, {token: 'ENEMY', toId: 2}]);
            board.resolve(PLAYER_TOKEN, 1, 0, 2);
            const t0 = board.getPosition(0).getToken();
            const t1 = board.getPosition(1).getToken();
            const t2 = board.getPosition(2).getToken();
            assert.deepEqual(
                {t0: t0, t1: t1, t2: t2},
                {t0: enumPositionTokens.TOKEN_EMPTY, t1: PLAYER_TOKEN, t2: enumPositionTokens.TOKEN_EMPTY}
            );
        });

    });


    describe('getState', function () {

        it('should correctly reflect state after a placing move', function () {
            const board = boardFactory.createBoard();
            board.resolve(PLAYER_TOKEN, 1);
            const s = board.getState();
            assert.equal(PLAYER_TOKEN, s[1]);
        });

        it('should correctly reflect state after a moving move', function () {
            const board = boardFactory.createBoard([{token: PLAYER_TOKEN, toId: 0}]);
            board.resolve(PLAYER_TOKEN, 1, 0);
            const s = board.getState();
            const t0 = s[0];
            const t1 = s[1];
            assert.deepEqual(
                {t0: t0, t1: t1},
                {t0: enumPositionTokens.TOKEN_EMPTY, t1: PLAYER_TOKEN}
            );
        });

        it('should correctly reflect state after a moving move with remove', function () {
            const board = boardFactory.createBoard([{token: PLAYER_TOKEN, toId: 0}, {token: 'ENEMY', toId: 2}]);
            board.resolve(PLAYER_TOKEN, 1, 0, 2);
            const s = board.getState();
            const t0 = s[0];
            const t1 = s[1];
            const t2 = s[2];
            assert.deepEqual(
                {t0: t0, t1: t1, t2: t2},
                {t0: enumPositionTokens.TOKEN_EMPTY, t1: PLAYER_TOKEN, t2: enumPositionTokens.TOKEN_EMPTY}
            );
        });

    });

});
