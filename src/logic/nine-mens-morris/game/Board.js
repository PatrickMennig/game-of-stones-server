const positionFactory = require('./Position');
const fieldIdFactory = require('./FieldId');
const enumBoardErrors = require('./errors/enumBoardErrors');



class Board {

    constructor() {
        this._board = setupBoard();
    }

    getPosition(id) {
        return this._board.get(fieldIdFactory.createFieldId(id).id);
    }

    resolveMove(move) {

        if (this.getPosition(move.toId).isEmpty() !== true) {
            throw new Error(enumBoardErrors.INVALID_MOVE_TARGET_OCCUPIED);
        }

        if (move.fromId && this.getPosition(move.fromId).isEmpty()) {
            throw new Error(enumBoardErrors.INVALID_MOVE_FROM_EMPTY);
        }

        if (move.fromId && this.getPosition(move.fromId).hasEnemyToken(move.token)) {
            throw new Error(enumBoardErrors.INVALID_MOVE_FROM_ENEMY);
        }

        if (move.removeId && this.getPosition(move.removeId).isEmpty()) {
            throw new Error(enumBoardErrors.INVALID_MOVE_REMOVE_EMPTY);
        }

        if (move.removeId && this.getPosition(move.removeId).hasEnemyToken(move.token) !== true) {
            throw new Error(enumBoardErrors.INVALID_MOVE_REMOVE_YOURS);
        }

        this.getPosition(move.toId).setToken(move.token);
        if(move.fromId) {
            this.getPosition(move.fromId).setTokenEmpty();
        }
        if(move.removeId) {
            this.getPosition(move.removeId).setTokenEmpty();
        }
    }
}


exports.createBoard = () => new Board();


const setupBoard = () => {

    const board = emptyBoard();

    for (let i = 0; i <= 21; i += 3) {

        // horizontal connections
        board.get(i).setRightNeighbor(board.get(i + 1));
        board.get(i + 1).setRightNeighbor(board.get(i + 2));
        board.get(i + 2).setLeftNeighbor(board.get(i + 1));
        board.get(i + 1).setLeftNeighbor(board.get(i));

    }

    setNeighboredVertical(board, 0, 9);
    setNeighboredVertical(board, 9, 21);

    setNeighboredVertical(board, 1, 4);
    setNeighboredVertical(board, 4, 7);

    setNeighboredVertical(board, 2, 14);
    setNeighboredVertical(board, 14, 23);

    setNeighboredVertical(board, 3, 10);
    setNeighboredVertical(board, 10, 18);

    setNeighboredVertical(board, 5, 13);
    setNeighboredVertical(board, 13, 20);

    setNeighboredVertical(board, 6, 11);
    setNeighboredVertical(board, 11, 15);

    setNeighboredVertical(board, 8, 12);
    setNeighboredVertical(board, 12, 17);

    setNeighboredVertical(board, 16, 19);
    setNeighboredVertical(board, 19, 22);

    return board;
};


const emptyBoard = () => new Map(new Array(24).fill(null).map((v, i) => [i, positionFactory.createPosition(i)]));

const setNeighboredVertical = (board, idA, idB) => {
    board.get(idA).setBottomNeighbor(board.get(idB));
    board.get(idB).setTopNeighbor(board.get(idA));
};