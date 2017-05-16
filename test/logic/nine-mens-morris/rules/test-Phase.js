const assert        = require('assert');
const phaseFactory  = require('../../../../src/logic/nine-mens-morris/rules/Phase');
const playerFactory = require('../../../../src/logic/nine-mens-morris/game/Player');


describe('Phase', function () {

    describe('constructor', function () {

        it('should return the correct phase one for a player in placing phase', function () {
            const p = playerFactory.createBotPlayer();

            for (let i = 0; i < 3; ++i) {
                p.placedToken();
            }

            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_1_PLACING);
        });


        it('should return the correct phase one for a player in placing phase', function () {
            const p = playerFactory.createBotPlayer();

            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_1_PLACING);
        });


        it('should return the correct phase one for a player in placing phase', function () {
            const p = playerFactory.createBotPlayer();

            for (let i = 0; i < 3; ++i) {
                p.placedToken();
                p.lostToken();
            }

            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_1_PLACING);
        });


        it('should return the correct phase two for a player in moving phase', function () {
            const p = playerFactory.createBotPlayer();

            for (let i = 0; i < 9; ++i) {
                p.placedToken();
            }

            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_2_MOVING);
        });


        it('should return the correct phase two for a player in moving phase', function () {
            const p = playerFactory.createBotPlayer();

            for (let i = 0; i < 9; ++i) {
                p.placedToken();
            }

            for (let i = 0; i < 3; ++i) {
                p.lostToken();
            }


            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_2_MOVING);
        });


        it('should return the correct phase three for a player in flying phase', function () {
            const p = playerFactory.createBotPlayer();

            for (let i = 0; i < 9; ++i) {
                p.placedToken();
            }

            for (let i = 0; i < 6; ++i) {
                p.lostToken();
            }

            const phase = phaseFactory.createPhase(p);
            const phaseName = phase.getPhase();

            assert.equal(phaseName, phase.phases().PHASE_3_FLYING);
        });

    });

});