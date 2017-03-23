const assert       = require('assert');
const boardFactory = require('../../../../../src/logic/nine-mens-morris/game/objects/Board');


describe('Board', function () {

    describe('constructor', function () {

        it('should create a board', function () {
            const board = boardFactory.createBoard();
        });

    });

    describe('layout', function () {

        it('should correctly describe the 1st horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(0);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [0,1,2,1,0]);
        });

        it('should correctly describe the 2nd horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(3);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [3,4,5,4,3]);
        });

        it('should correctly describe the 3rd horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(6);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [6,7,8,7,6]);
        });

        it('should correctly describe the 4th horizontal row left ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(9);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [9,10,11,10,9]);
        });

        it('should correctly describe the 4th horizontal row right ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(12);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [12,13,14,13,12]);
        });

        it('should correctly describe the 5th horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(15);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [15,16,17,16,15]);
        });

        it('should correctly describe the 6th horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(18);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [18,19,20,19,18]);
        });

        it('should correctly describe the 7h horizontal row ->', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(21);
            const rowIds = [
                pos.id,
                pos.getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().id,
                pos.getRightNeighbor().getRightNeighbor().getLeftNeighbor().getLeftNeighbor().id
            ];

            assert.deepEqual(rowIds, [21,22,23,22,21]);
        });


        it('should correctly describe the 1st vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(21);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [21,9,0,9,21]);
        });

        it('should correctly describe the 2nd vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(18);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [18,10,3,10,18]);
        });

        it('should correctly describe the 3rd vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(15);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [15,11,6,11,15]);
        });

        it('should correctly describe the 4th vertical row top ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(7);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [7,4,1,4,7]);
        });

        it('should correctly describe the 4th vertical row bottom ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(22);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [22,19,16,19,22]);
        });

        it('should correctly describe the 5th vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(17);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [17,12,8,12,17]);
        });

        it('should correctly describe the 6th vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(20);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [20,13,5,13,20]);
        });

        it('should correctly describe the 7h vertical row ^', function () {
            const board = boardFactory.createBoard();
            const pos = board.getPosition(23);
            const rowIds = [
                pos.id,
                pos.getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().id,
                pos.getTopNeighbor().getTopNeighbor().getBottomNeighbor().getBottomNeighbor().id
            ];

            assert.deepEqual(rowIds, [23,14,2,14,23]);
        });

    });

});
