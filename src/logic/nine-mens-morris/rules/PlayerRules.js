


class PlayerRules {

    static canPlaceToken(player) {
        return player.getNumTokensInHand() > 0;
    }

    static canFly() {
        return player.getNumTokensTotal() === 3;
    }

}


module.exports = PlayerRules;