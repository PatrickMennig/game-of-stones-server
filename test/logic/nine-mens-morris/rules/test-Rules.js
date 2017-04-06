


describe('Rules', function () {

    describe('isValidMove', function () {

        it('should be a valid move, not a winning one, not closing a mill');

        it('should be a valid move, not a winning one, closing a mill');

        it('should be a valid move, a winning one, closing a mill');

        it('should not be a valid move, not moving your own token');

        it('should not be a valid move, from-field does not contain your own token');

        it('should not be a valid move for phase 1, to-field is occupied');

        it('should not be a valid move for phase 2, no from-field supplied');

        it('should not be a valid move for phase 2, fields from and to are not adjacent');

        it('should not be a valid move for phase 2, to field is occupied');

        it('should not be a valid move for phase 3, to field is occupied');

        it('should not be a valid move, closing a mill but removal is invalid');

        it('should not be a valid move, closing a mill but other player has not enough tokens on the board');

    });

});