


class PlayerRules {

    static canPlaceToken(player) {
        return player.getNumTokensInHand() > 0;
    }

    static canFly(player) {
        return player.getNumTokensTotal() === 3;
    }

}


module.exports = PlayerRules;