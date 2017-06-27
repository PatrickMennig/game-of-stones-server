const positionFactory = require('./Position');
const hash            = require('object-hash');


class Board {

    constructor() {
        this._board = setupBoard();
    }

    getPosition(id) {
        return this._board[positionFactory.id(id)];
    }

    getState() {
        return this._board.map(p => p.getToken());
    }

    resolve(token, toId, fromId, removeId) {

        this.getPosition(toId).setToken(token);

        if (typeof fromId === 'number') {
            this.getPosition(fromId).setTokenEmpty();
        }

        if (typeof removeId === 'number') {
            this.getPosition(removeId).setTokenEmpty();
        }
    }

    isAdjacent(posOne, posTwo) {
        return this.getPosition(posOne).isNeighborOf(this.getPosition(posTwo));
    }

    getChildStates(activePlayer) {
        //TODO implement
        // child states have to be copies of the board
    }

    hasChildStates() {
        //TODO implement
    }
}


exports.createBoard            = () => new Board();
exports.createBoardWithPattern = (pattern) => {
    const board = new Board();
    pattern.forEach(p => board.resolve(p.token, p.id));
    return board;
};


const setupBoard = () => {

    const board = emptyBoard();

    for (let i = 0; i <= 21; i += 3) {
        // horizontal connections
        board[i].setRightNeighbor(board[i + 1]);
        board[i + 1].setRightNeighbor(board[i + 2]);
        board[i + 2].setLeftNeighbor(board[i + 1]);
        board[i + 1].setLeftNeighbor(board[i]);
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

const emptyBoard = () => new Array(24).fill(null).map((v, i) => positionFactory.createPosition(i));

const setNeighboredVertical = (board, idA, idB) => {
    board[idA].setBottomNeighbor(board[idB]);
    board[idB].setTopNeighbor(board[idA]);
};