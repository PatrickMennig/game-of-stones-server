const assert       = require('assert');
const boardFactory = require('../../../../src/logic/nine-mens-morris/game/Board');
const moveFactory  = require('../../../../src/logic/nine-mens-morris/game/Move');
const MillRules    = require('../../../../src/logic/nine-mens-morris/rules/MillRules');

const PLAYER_ONE_TOKEN = 'a12345';
const PLAYER_TWO_TOKEN = 'b67890';


describe('MillRules', function () {

    describe('willBeMill', function () {

        it('should return true for a token that will be in a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 0},
                    {token: PLAYER_ONE_TOKEN, id: 9}
                ]
            );
            const m          = moveFactory.createMove(PLAYER_ONE_TOKEN, 21);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, true);
        });

        it('should return true for a token that will be in a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 0},
                    {token: PLAYER_ONE_TOKEN, id: 2}
                ]
            );
            const m          = moveFactory.createMove(PLAYER_ONE_TOKEN, 1);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, true);
        });

        it('should return true for a token that will be in two mills', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 21},
                    {token: PLAYER_ONE_TOKEN, id: 22},
                    {token: PLAYER_ONE_TOKEN, id: 2},
                    {token: PLAYER_ONE_TOKEN, id: 14},
                ]
            );
            const m          = moveFactory.createMove(PLAYER_ONE_TOKEN, 23);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, true);
        });

        it('should return false for a token that will not be in a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 0},
                    {token: PLAYER_ONE_TOKEN, id: 2}
                ]
            );
            const m          = moveFactory.createMove(PLAYER_ONE_TOKEN, 4);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, false);
        });

        it('should return false for a token that will move within a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 0},
                    {token: PLAYER_ONE_TOKEN, id: 2}
                ]
            );
            const m          = moveFactory.createMove(PLAYER_ONE_TOKEN, 1, 2);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, false);
        });

        it('should return false for a different players token that will not be in a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 1},
                    {token: PLAYER_ONE_TOKEN, id: 2}
                ]
            );
            const m          = moveFactory.createMove(PLAYER_TWO_TOKEN, 0);
            const willBeMill = MillRules.willBeMill(m, b);
            assert.equal(willBeMill, false);
        });

    });


    describe('isInMill', function () {

        it('should return true for three tokens in a mill', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 3},
                    {token: PLAYER_ONE_TOKEN, id: 10},
                    {token: PLAYER_ONE_TOKEN, id: 18},
                ]
            );
            const isMill = MillRules.isInMill(3, PLAYER_ONE_TOKEN, b);
            assert.equal(isMill, true);
        });

        it('should return true for a token in two mills', function () {
            const b          = boardFactory.createBoardWithPattern(
                [
                    {token: PLAYER_ONE_TOKEN, id: 0},
                    {token: PLAYER_ONE_TOKEN, id: 1},
                    {token: PLAYER_ONE_TOKEN, id: 2},
                    {token: PLAYER_ONE_TOKEN, id: 14},
                    {token: PLAYER_ONE_TOKEN, id: 23},
                ]
            );
            const isMill = MillRules.isInMill(2, PLAYER_ONE_TOKEN, b);
            assert.equal(isMill, true);
        });

    });

});

