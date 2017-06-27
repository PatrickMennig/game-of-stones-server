class NegaMax {

    static negamax(board, depth, activePlayer, inactivePlayer, evalFn, color = 1) {

        if (depth === 0 || !board.hasChildStates()) {
            return color * evalFn(board, activePlayer.getToken(), inactivePlayer.getToken());
        }

        let bestValue  = NegaMax.minVal();
        const children = board.getChildStates(activePlayer);

        children.forEach(child => {

            const value = -1 * this.negamax(child, --depth, inactivePlayer, activePlayer, evalFn, color * -1);
            bestValue   = Math.max(bestValue, value);

        });

        return bestValue;
    }

    static minVal() {
        return -1000000;
    }
}

module.exports = NegaMax;