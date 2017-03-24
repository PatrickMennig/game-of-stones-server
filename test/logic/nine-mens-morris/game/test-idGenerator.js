const assert      = require('assert');
const idGenerator = require('../../../../src/logic/nine-mens-morris/game/idGenerator');


describe('idGenerator', function () {

    describe('nextId', function () {

        it('should return ids with 12 characters length', function () {
            const id = idGenerator.nextId();
            assert.equal(id.length, 12);
        });

        it('should return ids with 6 characters length', function () {
            const id = idGenerator.nextId(6);
            assert.equal(id.length, 6);
        });

        it('should return 2.500.000 unique ids', function (done) {
            this.timeout(5000);
            const ids = new Set();
            for(let i = 0; i < 2500000; i++) {
                let id = idGenerator.nextId();
                if(ids.has(id)) {
                    return done(new Error('Duplicate IDs when trying to generate 2.500.000 unique ids.'));
                }
                ids.add(id);
            }
            done();
        });

    });

});
